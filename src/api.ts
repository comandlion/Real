import axios from "axios";
import {
  Property,
  PropertySearchFilters,
  PropertyListResponse,
} from "@/types/property";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const login = (data: { username: string; password: string }) =>
  API.post("login/", data);

export const register = (data: {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
}) => API.post("register/", data);

export const getUser = (token: string) =>
  API.get("user/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

class PropertyAPI {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const authHeaders = this.getAuthHeaders();

    const response = await fetch(`http://localhost:8000/api${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, redirect to login
        localStorage.removeItem("token");
        window.location.href = "/signin";
        return Promise.reject(new Error("Authentication required"));
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getProperties(
    filters?: PropertySearchFilters,
  ): Promise<PropertyListResponse> {
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.listing_type)
        queryParams.append("listing_type", filters.listing_type.join(","));
      if (filters.price_range) {
        queryParams.append("price__gte", filters.price_range.min.toString());
        queryParams.append("price__lte", filters.price_range.max.toString());
      }
    }

    return this.request<PropertyListResponse>(
      `/properties/?${queryParams.toString()}`,
    );
  }

  async getProperty(id: number): Promise<Property> {
    return this.request<Property>(`/properties/${id}/`);
  }

  async getMapData(): Promise<any[]> {
    return this.request<any[]>("/properties/map_data/");
  }

  async incrementViews(id: number): Promise<void> {
    await this.request(`/properties/${id}/increment_views/`, {
      method: "POST",
    });
  }

  async searchProperties(filters: PropertySearchFilters): Promise<Property[]> {
    return this.request<Property[]>("/properties/search/", {
      method: "POST",
      body: JSON.stringify(filters),
    });
  }
}

export const propertyAPI = new PropertyAPI();

// // Like a property or listing
// export const likeItem = async ( itemType: 'property' | 'listing', itemId: number, token: string ) => {
//     try {
//         const payload =
//             itemType === 'property'
//                 ? { property: itemId }
//                 : { listing: itemId };
//
//         const response = await API.post(
//             'likes/',
//             payload,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Response data:', error.response?.data);
//         }
//         console.error('Error liking item:', error);
//         throw error;
//     }
// };
//
// // Remove like
// export const unlikeItem = async (itemType: 'property' | 'listing', itemId: number, token: string) => {
//     try {
//
//         const response = await API.delete('likes/remove-like/', {
//             data: { [itemType]: itemId },
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error unliking item:', error);
//         throw error;
//     }
// };
//
// // Add to favorites
// export const addFavorite = async (itemType: 'property' | 'listing', itemId: number, token: string) => {
//     try {
//         const payload =
//             itemType === 'property'
//                 ? { property: itemId }
//                 : { listing: itemId };
//
//         const response = await API.post('favorites/', payload,{
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error adding favorite:', error);
//         throw error;
//     }
// };
//
// // Remove from favorites
// export const removeFavorite = async (itemType: 'property' | 'listing', itemId: number, token: string) => {
//     try {
//         const response = await API.delete('/favorites/remove-favorite/', {
//             data: { [itemType]: itemId },
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error removing favorite:', error);
//         throw error;
//     }
// };
//
// // Check if item is liked/favorited
// export const getInteractions = async (itemType: 'property' | 'listing', itemId: number, token: string) => {
//     try {
//         const endpoint = itemType === 'property' ? 'properties' : 'listings';
//
//         const response = await API.get(`/${endpoint}/${itemId}/interactions/`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error getting interactions:', error);
//         throw error;
//     }
// };
//
// export const fetchComments = async ( itemType: 'property' | 'listing', itemId: number, token: string ) => {
//     try {
//         const endpoint = itemType === 'property' ? 'properties' : 'listings';
//
//         const response = await API.get(`/${endpoint}/${itemId}/comments/`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return response.data; // Array of comments expected
//     } catch (error) {
//         console.error('Failed to fetch comments:', error);
//         throw error;
//     }
// };
