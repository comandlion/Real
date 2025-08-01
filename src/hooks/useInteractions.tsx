import { useState, useEffect } from 'react';
import { likeItem, unlikeItem, addFavorite, removeFavorite, getInteractions } from '../api';
import { type InteractionState } from '../types/types.ts';

export const useInteractions = ( itemType: 'property' | 'listing', itemId: number, token: string ) => {

    const [interactions, setInteractions] = useState<InteractionState>({
        isLiked: false,
        isFavorite: false,
        likeCount: 0,
        favoriteCount: 0
    });
    const [loading, setLoading] = useState(true);

    // Fetch interactions from backend
    useEffect(() => {
        const fetchInteractions = async () => {
            try {
                const data = await getInteractions(itemType, itemId, token);
                setInteractions({
                    isLiked: data.is_liked,
                    isFavorite: data.is_favorite,
                    likeCount: data.like_count,
                    favoriteCount: data.favorite_count
                });
            } catch (error) {
                console.error('Failed to load interactions:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchInteractions();
        else setLoading(false);
    }, [itemType, itemId, token]);

    // Toggle like
    const handleLike = async () => {
        try {
            if (interactions.isLiked) {
                await unlikeItem(itemType, itemId, token);
                setInteractions(prev => ({
                    ...prev,
                    isLiked: false,
                    likeCount: prev.likeCount - 1
                }));
            } else {
                await likeItem(itemType, itemId, token);
                setInteractions(prev => ({
                    ...prev,
                    isLiked: true,
                    likeCount: prev.likeCount + 1
                }));
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    // Toggle favorite
    const handleFavorite = async () => {
        try {
            if (interactions.isFavorite) {
                await removeFavorite(itemType, itemId, token);
                setInteractions(prev => ({
                    ...prev,
                    isFavorite: false,
                    favoriteCount: prev.favoriteCount - 1
                }));
            } else {
                await addFavorite(itemType, itemId, token);
                setInteractions(prev => ({
                    ...prev,
                    isFavorite: true,
                    favoriteCount: prev.favoriteCount + 1
                }));
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    // Share URL or copy to clipboard
    const handleShare = () => {
        const url = `${window.location.origin}/${itemType}/${itemId}`;
        if (navigator.share) {
            navigator.share({ title: `Check out this ${itemType}!`, url })
                .catch(err => console.error('Share failed:', err));
        } else {
            navigator.clipboard.writeText(url)
                .then(() => alert('Link copied to clipboard!'))
                .catch(err => console.error('Clipboard error:', err));
        }
    };

    return {
        ...interactions,
        loading,
        handleLike,
        handleFavorite,
        handleShare
    };
};
