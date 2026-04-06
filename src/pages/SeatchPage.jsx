import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { motion } from 'framer-motion';
import { HiStar, HiOutlineShoppingCart, HiOutlineSearch } from 'react-icons/hi';
import { toast } from 'react-toastify';

// Reusing the Skeleton Loader for consistency
const SkeletonCard = () => (
  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-4">
    <motion.div className="bg-slate-700 w-full h-48 rounded-lg" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
    <div className="space-y-2">
      <motion.div className="h-4 bg-slate-700 rounded w-3/4" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.div className="h-3 bg-slate-700 rounded w-1/2" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
    </div>
  </div>
);

function SearchPage() {
  // 1. Grab the search term from the URL (e.g., ?query=shirt)
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // 2. Fetch all products
  const url = 'https://fakestoreapi.com/products';
  const { data, loading, error } = useFetch(url);

  // 3. Filter the products based on the query (case-insensitive)
  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()) || 
    product.category.toLowerCase().includes(query.toLowerCase())
  ) || [];

  const handleAddToCart = (productName) => {
    toast.success(`${productName} added to cart! 🛒`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  if (error) return <div className="text-center text-red-500 p-10 font-bold">Error: {error}</div>;

  return (
    <div className="p-8 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8 border-b border-slate-800 pb-4">
          <h2 className="text-2xl text-slate-300">
            Search results for: <span className="text-amber-500 font-bold">"{query}"</span>
          </h2>
          <p className="text-slate-500 mt-1">
            Found {filteredProducts?.length || 0} items
          </p>
        </div>

        {/* --- LOADING STATE --- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : 
        
        /* --- EMPTY STATE (No results found) --- */
        filteredProducts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <HiOutlineSearch className="text-6xl text-slate-600 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
            <p>We couldn't find anything matching "{query}".</p>
            <Link to="/" className="relative z-50 mt-6 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors border border-slate-700">
              Back to Home
            </Link>
          </div>
        ) : 
        
        /* --- DATA STATE (Show filtered products) --- */
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-amber-500/50 transition-all flex flex-col shadow-xl"
              >
                {/* 1. Product Image */}
                <div className="relative bg-white rounded-lg p-6 h-56 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-amber-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                {/* 2. Product Info */}
                <div className="mt-4 flex-grow flex flex-col">
                  <h3 className="text-white font-semibold text-sm line-clamp-2 h-10 group-hover:text-amber-400 transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center text-amber-400">
                      <HiStar className="text-lg" />
                      <span className="text-xs ml-1 text-slate-300">
                        {product.rating?.rate}
                      </span>
                    </div>
                    <span className="text-xl font-black text-white">${product.price}</span>
                  </div>
                </div>

                {/* 3. Add to Cart Button */}
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(product.title)}
                  className="mt-5 w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/10"
                >
                  <HiOutlineShoppingCart className="text-lg" />
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;