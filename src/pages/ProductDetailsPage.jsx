import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'framer-motion';
import { HiStar, HiOutlineShoppingCart, HiOutlineHeart, HiHeart, HiArrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';

function ProductDetailsPage() {
  const { id } = useParams(); // Grabs the ID from the URL (e.g., /product/1)
  const navigate = useNavigate();
  
  // Fetch just this single product!
  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);

  // Global Contexts
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-amber-500 font-bold text-xl">Loading Product...</div>;
  if (error || !product) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-red-500 font-bold text-xl">Product not found.</div>;

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart! 🛒`, { position: "bottom-right", autoClose: 2000, theme: "dark" });
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist", { position: "bottom-right", autoClose: 1500, theme: "dark" });
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist! ❤️", { position: "bottom-right", autoClose: 1500, theme: "dark" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <HiArrowLeft /> Back to Shop
        </button>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          {/* LEFT: Image Gallery Area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2 bg-white p-8 sm:p-12 flex items-center justify-center relative min-h-[400px]"
          >
            {/* FakeStore API only gives 1 image, so we feature it prominently */}
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-w-full max-h-[500px] object-contain drop-shadow-2xl"
            />
            <button 
              onClick={handleWishlistToggle}
              className="absolute top-6 right-6 p-3 bg-slate-100/80 hover:bg-slate-200 backdrop-blur-md rounded-full transition-transform hover:scale-110 shadow-lg"
            >
              {isWishlisted ? <HiHeart className="text-red-500 text-2xl" /> : <HiOutlineHeart className="text-slate-400 text-2xl" />}
            </button>
          </motion.div>

          {/* RIGHT: Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center"
          >
            <span className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-3 block">
              {product.category}
            </span>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                <HiStar className="text-xl mr-1" />
                <span className="font-bold">{product.rating?.rate}</span>
              </div>
              <span className="text-slate-400 text-sm ">
                 {product.rating?.count} Reviews
              </span>
            </div>

            <p className="text-5xl font-black text-white mb-8">
              ${product.price.toFixed(2)}
            </p>

            <div className="mb-10">
              <h3 className="text-lg font-bold text-white mb-2">Description</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-amber-500/20 text-lg hover:-translate-y-1"
            >
              <HiOutlineShoppingCart className="text-2xl" />
              Add to Cart
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;