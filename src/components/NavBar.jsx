import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { HiOutlineHeart, HiOutlineShoppingCart } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function NavBar() {

  const { cartCount } = useCart();

  const { wishlist } = useWishlist();

  return (
    <nav className="bg-slate-900 text-white shadow-xl sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">

        {/* TOP ROW: Logo and Icons (Always h-16) */}
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Left: Logo */}
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          {/* Center: Desktop Search (Hidden on mobile) */}
          <div className="hidden md:block flex-grow max-w-2xl">
            <SearchBar />
          </div>

          {/* Right: Action Icons */}
          <div className="flex items-center space-x-5 shrink-0">

            <Link to="/wishlist" className=" relative hover:text-amber-400 transition-colors">
              <HiOutlineHeart size={26} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full border-2 border-slate-900">
                  {wishlist.length}
                </span>
              )}
            </Link>



            <Link to="/cart" className="relative p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-all">
              <HiOutlineShoppingCart size={22} className="text-amber-500" />
              <span className="absolute -top-1 -right-1 bg-white text-slate-900 text-[10px] font-bold px-1.5 rounded-full border-2 border-slate-900">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* BOTTOM ROW: Mobile Search (Visible ONLY on mobile) */}
        {/* We add pb-4 (padding bottom) so it doesn't touch the edge */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>

      </div>
    </nav>
  );
}

export default NavBar;