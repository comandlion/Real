export interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
}

export interface ApiError {
    response?: {
        data?: {
            first_name?: string[];
            last_name?: string[];
            username?: string[];
            email?: string[];
            password1?: string[];
            password2?: string[];
            error?: string;
            [key: string]: any;
        };
    };
}

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    // Extend as needed
}

export interface UserContextType {
    user: User | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
}

export interface Property {
    id: string;
    title: string;
    description: string;
    country: string;
    town: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    square_footage: number;
    images: PropertyImage[];
    propertyType: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land';
    likes: number;
    comments: Comment[];
    createdAt: string;
}

export interface PropertyImage {
    id: string;
    image: string; // URL to the image
    is_primary: boolean;
}

export interface Comment {
    id: string;
    user: string;
    content: string;
    createdAt: string;
}

export interface PropertyFormData {
    agent: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    property_type: string;
    bedrooms: number;
    bathrooms: number;
    square_footage: number;
    year_built?: number;
    images: FileList | null;
    address: {
        street_address: string;
        city: string;
        state_province: string;
        postal_code: string;
        country: string;
    };
}

export interface Option {
    id: number;
    name: string;
}

export interface InteractionState {
    isLiked: boolean;
    isFavorite: boolean;
    likeCount: number;
    favoriteCount: number;
}