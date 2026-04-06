import React from 'react';
import { motion } from 'framer-motion';
// 1. Import the Heart icons!
import { HiStar, HiOutlineShoppingCart, HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
// 2. Import our future Wishlist Hook
import { useWishlist } from '../context/WishlistContext'; 
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  if (!product) return null;

  const { addToCart } = useCart();
  // 3. Extract the wishlist functions and state
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate()

  // 4. Check if this specific product is already in the wishlist
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product);
    toast.success(`${product.title} added to cart! 🛒`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  // 5. Toggle Wishlist Logic
  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist", { position: "bottom-right", autoClose: 1500, theme: "dark" });
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist! ❤️", { position: "bottom-right", autoClose: 1500, theme: "dark" });
    }
  };

  return (
    <motion.div 
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-amber-500/50 transition-all flex flex-col shadow-xl h-full"
    >
      {/* 1. Product Image Container */}
      <div className="relative bg-white rounded-lg p-6 h-56 flex items-center justify-center overflow-hidden">
        <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
        
        {/* Category Badge (Top Left) */}
        <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-amber-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
          {product.category}
        </span>

        {/* Wishlist Button (Top Right) */}
        <button 
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-slate-900/80 backdrop-blur-md rounded-full transition-transform hover:scale-110 z-10"
        >
          {isWishlisted ? (
            <HiHeart className="text-red-500 text-lg" />
          ) : (
            <HiOutlineHeart className="text-slate-300 hover:text-red-400 text-lg transition-colors" />
          )}
        </button>
      </div>

      {/* 2. Product Info */}
      <div className="mt-4 flex-grow flex flex-col">
        <h3 className="text-white font-semibold text-sm line-clamp-2 h-10 group-hover:text-amber-400 transition-colors">{product.title}</h3>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-amber-400">
            <HiStar className="text-lg" />
            <span className="text-xs ml-1 text-slate-300">{product.rating?.rate}</span>
          </div>
          <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
        </div>
      </div>

      {/* 3. Add to Cart Button */}
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        className="mt-5 w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/10"
      >
        <HiOutlineShoppingCart className="text-lg" />
        Add to Cart
      </motion.button>
    </motion.div>
  );
}

export default ProductCard;