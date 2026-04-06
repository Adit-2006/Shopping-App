import React, { useState, useEffect, useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce'; // Bring back our custom hook!

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const lastSearched = useRef('')

  // 1. Hook into the debounced version of the query (Waits 600ms)
  const debouncedQuery = useDebounce(query, 600);

  // 2. LIVE SEARCH: Automatically navigate when the user stops typing
  useEffect(() => {
    // Only search if there's actual text (prevents empty searches)
    if (!query){
      return;
    }
    if (debouncedQuery.trim() && debouncedQuery !== lastSearched.current) {
      lastSearched.current = debouncedQuery
      navigate(`/search?query=${debouncedQuery}`);
    }
  }, [debouncedQuery, navigate]);

  // 3. CLEANUP: Wipes the search bar when the user leaves the Search page
  useEffect(() => {
    if (location.pathname !== '/search') {
      setQuery(""); 
      lastSearched.current = ''
    }
  }, [location.pathname]); 

  // 4. MANUAL SEARCH: In case they hit "Enter" super fast before the 600ms timer finishes
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      lastSearched.current = query  
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <input 
        type="text"
        placeholder="Search for items..."
        className="w-full p-2 bg-slate-800 text-white rounded-lg outline-none border border-slate-700 focus:border-amber-500 transition-colors"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;