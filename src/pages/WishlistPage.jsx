import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard'; // Reusing our Worker!
import { HiOutlineHeart } from 'react-icons/hi';

function WishlistPage() {
  // 1. Pull the wishlist array from our global Context
  const { wishlist } = useWishlist();

  // --- EMPTY STATE ---
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-center">
        <HiOutlineHeart className="text-8xl text-slate-700 mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Your Wishlist is empty</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          Found something you like? Tap the heart icon on any product to save it here for later.
        </p>
        <Link 
          to="/" 
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-amber-500/20"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  // --- POPULATED STATE ---
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">My Wishlist</h1>
          <span className="text-slate-400">{wishlist.length} saved items</span>
        </div>

        {/* 2. The Grid - Exact same layout as our Shop Page! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            // 3. Drop in the reusable Product Card!
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;