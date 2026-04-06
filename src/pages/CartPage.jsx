import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { HiOutlineTrash, HiMinus, HiPlus, HiOutlineShoppingBag } from 'react-icons/hi';

function CartPage() {
    // 1. Pull everything we need from our global Context!
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    // A fun little realistic touch: Free shipping over $100!
    const shippingCost = cartTotal > 100 || cartTotal === 0 ? 0 : 10.00;
    const finalTotal = cartTotal + shippingCost;

    // --- EMPTY STATE ---
    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-center">
                <HiOutlineShoppingBag className="text-8xl text-slate-700 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
                <p className="text-slate-400 mb-8 max-w-md">
                    Looks like you haven't added anything to your cart yet. Let's get you back to the shop to find something great!
                </p>
                <Link
                    to="/"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-amber-500/20"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    // --- POPULATED CART STATE ---
    return (
        <div className="min-h-screen bg-slate-900 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT COLUMN: Cart Items */}
                    <div className="w-full lg:w-2/3 space-y-4">
                        {cart.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6 border border-slate-700 relative"
                            >
                                {/* Product Image */}
                                <div className="w-full sm:w-32 h-32 bg-white rounded-lg p-2 flex shrink-0 items-center justify-center overflow-hidden">
                                    <img src={item.image} alt={item.title} className="max-h-full object-contain" />
                                </div>

                                {/* Product Details */}
                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="text-white font-semibold text-lg line-clamp-2">{item.title}</h3>
                                    <p className="text-amber-500 font-black text-xl mt-2">${item.price.toFixed(2)}</p>
                                </div>

                                {/* Controls (Quantity & Remove) */}
                                <div className="flex flex-row sm:flex-col items-center gap-4 shrink-0">

                                    {/* Quantity Pill */}
                                    <div className="flex items-center bg-slate-900 rounded-full border border-slate-700 p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
                                        >
                                            <HiMinus size={14} />
                                        </button>
                                        <span className="w-8 text-center text-white font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
                                        >
                                            <HiPlus size={14} />
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 transition-colors"
                                    >
                                        <HiOutlineTrash size={18} />
                                        <span className="sm:hidden">Remove</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: Order Summary (Sticky) */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 sticky top-24 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Order Summary</h3>

                            <div className="space-y-4 text-slate-300 mb-6 border-b border-slate-700 pb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white font-semibold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className={shippingCost === 0 ? "text-green-400 font-semibold" : "text-white font-semibold"}>
                                        {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                {shippingCost > 0 && (
                                    <p className="text-xs text-slate-500 text-right">
                                        Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <span className="text-lg font-bold text-white">Total</span>
                                <span className="text-3xl font-black text-amber-500">${finalTotal.toFixed(2)}</span>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full block text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-lg transition-colors shadow-lg shadow-amber-500/20 text-lg"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CartPage;