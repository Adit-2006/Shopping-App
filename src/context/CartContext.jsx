import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. THE FIX: "Lazy Initialize" the state from localStorage
  // By passing a function into useState, it only checks the hard drive ONCE when the app loads.
  const [cart, setCart] = useState(() => {
    try {
      // Look for a saved cart under the name "swiftcart_items"
      const savedCart = localStorage.getItem('swiftcart_items');
      // If it exists, turn it back into a JavaScript array. If not, start with an empty array.
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from local storage", error);
      return [];
    }
  });

  // 2. THE WATCHER: Save to localStorage every time the cart changes
  useEffect(() => {
    // Turn the cart array into a string and save it to the browser
    localStorage.setItem('swiftcart_items', JSON.stringify(cart));
  }, [cart]); // This runs every single time the 'cart' variable updates!

  // --- ACTIONS (These stay exactly the same!) ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; 
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // --- DERIVED STATE (The Math) ---
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);