import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { motion } from 'framer-motion';
import Filter from '../components/Filter';          
import Sort from '../components/Sort'; 
import ProductCard from '../components/ProductCard'; 

const SkeletonCard = () => (
  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-4">
    <motion.div className="bg-slate-700 w-full h-48 rounded-lg" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
    <div className="space-y-2">
      <motion.div className="h-4 bg-slate-700 rounded w-3/4" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.div className="h-3 bg-slate-700 rounded w-1/2" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
    </div>
  </div>
);

function ShopPage() {
  const url = 'https://fakestoreapi.com/products';
  const { data, loading, error } = useFetch(url);

  // --- 1. STATE (Both Filters and Sort) ---
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortType, setSortType] = useState('default'); 

  // Extract unique categories
  const categories = data ? [...new Set(data.map(item => item.category))] : [];

  const clearFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(1000);
    setSortType('default');
  };

  // --- 2. MASTER DERIVED STATE (Filter + Sort) ---
  const processedProducts = (data || [])
    .filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortType === 'price-asc') return a.price - b.price;
      if (sortType === 'price-desc') return b.price - a.price;
      if (sortType === 'rating-desc') return b.rating.rate - a.rating.rate;
      return 0; 
    });

  if (error) return <div className="text-center text-red-500 p-10 font-bold">Error: {error}</div>;

  return (
    <div className="p-8 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* LEFT COLUMN: THE FILTER SIDEBAR */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <Filter 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            clearFilters={clearFilters}
          />
        </div>

        {/* RIGHT COLUMN: THE PRODUCT GRID */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          
          {/* Header with Sort  */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 border-b border-slate-800 pb-4 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">All Products</h2>
              <span className="text-slate-400">{processedProducts.length} Results</span>
            </div>
            
            <Sort sortType={sortType} setSortType={setSortType} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              [...Array(12)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              processedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ShopPage;