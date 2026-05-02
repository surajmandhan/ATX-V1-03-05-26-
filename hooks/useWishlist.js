"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';

/**
 * useWishlist Hook
 * Manages wishlist state with Optimistic UI, Local Storage, and Background Shopify Sync.
 */
export const useWishlist = (userData, customerToken) => {
    const [wishlist, setWishlist] = useState([]);
    
    // User-specific storage key
    const storageKey = userData?.id ? `atx_wishlist_${userData.id}` : 'atx_wishlist_guest';

    // 1. Initial Hydration & User Change
    useEffect(() => {
        const localWishlist = localStorage.getItem(storageKey);
        if (localWishlist) {
            try {
                setWishlist(JSON.parse(localWishlist));
            } catch (e) {
                console.error("Failed to parse local wishlist");
                setWishlist([]);
            }
        } else {
            setWishlist([]);
        }
    }, [userData, storageKey]);

    // 2. Toggle Wishlist Action
    const toggleWishlist = useCallback((productId) => {
        const isExist = wishlist.includes(productId);
        const nextWishlist = isExist 
            ? wishlist.filter(id => id !== productId) 
            : [...wishlist, productId];

        // Update Local Storage & State Instantly
        setWishlist(nextWishlist);
        localStorage.setItem(storageKey, JSON.stringify(nextWishlist));
        
        if (!isExist) {
            toast.success("Added to wishlist");
        } else {
            toast("Removed from wishlist");
        }
    }, [wishlist, storageKey]);

    const isInWishlist = (productId) => wishlist.includes(productId);

    return {
        wishlist,
        toggleWishlist,
        isInWishlist,
        isSyncing: false // No longer syncing with server
    };
};
