import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // Load from local storage, or start empty
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('swiftcart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  // Save to local storage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('swiftcart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      // Prevent duplicates just in case
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);