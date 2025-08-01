import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

export const login = (data: { username: string; password: string }) =>
    API.post('login/', data);

export const register = (data: { first_name: string; last_name: string; username: string; email: string; password1: string; password2: string }) =>
    API.post('register/', data);

export const getUser = (token: string) =>
    API.get('user/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getProperties = (params = {}, token?: string | null) =>
    API.get('properties/', {
        params,
        headers: token
            ? {
                Authorization: `Bearer ${token}`,
            }
            : {},
    });

export const createProperty = (data: FormData, token: string) =>
    API.post('properties/', data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // for file/image uploads
        },
    });

// Like a property or listing
export const likeItem = async ( itemType: 'property' | 'listing', itemId: number, token: string ) => {
    try {
        const payload =
            itemType === 'property'
                ? { property: itemId }
                : { listing: itemId };

        const response = await API.post(
            'likes/',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Response data:', error.response?.data);
        }
        console.error('Error liking item:', error);
        throw error;
    }
};

// Remove like
export const unlikeItem = async (itemType: 'property' | 'listing', itemId: number, token: string) => {
    try {

        const response = await API.delete('likes/remove-like/', {
            data: { [itemType]: itemId },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error unliking item:', error);
        throw error;
    }
};

// Add to favorites
export const addFavorite = async (itemType: 'property' | 'listing', itemId: number, token: string) => {
    try {
        const payload =
            itemType === 'property'
                ? { property: itemId }
                : { listing: itemId };

        const response = await API.post('favorites/', payload,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
};

// Remove from favorites
export const removeFavorite = async (itemType: 'property' | 'listing', itemId: number, token: string) => {
    try {
        const response = await API.delete('/favorites/remove-favorite/', {
            data: { [itemType]: itemId },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
};

// Check if item is liked/favorited
export const getInteractions = async (itemType: 'property' | 'listing', itemId: number, token: string) => {
    try {
        const endpoint = itemType === 'property' ? 'properties' : 'listings';

        const response = await API.get(`/${endpoint}/${itemId}/interactions/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting interactions:', error);
        throw error;
    }
};

export const fetchComments = async ( itemType: 'property' | 'listing', itemId: number, token: string ) => {
    try {
        const endpoint = itemType === 'property' ? 'properties' : 'listings';

        const response = await API.get(`/${endpoint}/${itemId}/comments/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Array of comments expected
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        throw error;
    }
};

