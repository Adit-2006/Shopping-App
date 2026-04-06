import React from 'react';

function Filter({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  maxPrice, 
  setMaxPrice,
  clearFilters 
}) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-fit sticky top-24">
      <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-2">
        Filters
      </h3>

      {/* 1. Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Category
        </label>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg p-2.5 outline-none focus:border-amber-500 transition-colors capitalize"
        >
          <option value="all">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Price Filter (Slider) */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex justify-between">
          <span>Max Price</span>
          <span className="text-amber-500 font-bold">${maxPrice}</span>
        </label>
        <input 
          type="range" 
          min="0" 
          max="1000" 
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>$0</span>
          <span>$1000+</span>
        </div>
      </div>

      {/* 3. Clear Filters Button */}
      <button 
        onClick={clearFilters}
        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition-colors border border-slate-600"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default Filter;