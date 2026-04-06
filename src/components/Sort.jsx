import React from 'react';

function Sort({ sortType, setSortType }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-semibold text-slate-400">
        Sort By:
      </label>
      <select 
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="bg-slate-800 border border-slate-700 text-white rounded-lg p-2 outline-none focus:border-amber-500 transition-colors text-sm cursor-pointer"
      >
        <option value="default">None</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Highest Rated</option>
      </select>
    </div>
  );
}

export default Sort;