import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { HiOutlineCreditCard, HiOutlineShieldCheck } from 'react-icons/hi';

function CheckoutPage() {
  // 1. We now pull the 'cart' array itself to display the items
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // 2. Updated Math logic including Taxes (Mock 8% tax rate)
  const shippingCost = cartTotal > 100 || cartTotal === 0 ? 0 : 10.00;
  const estimatedTax = cartTotal * 0.08; 
  const finalTotal = cartTotal + shippingCost + estimatedTax;

  const [isProcessing, setIsProcessing] = useState(false);

  if (cartTotal === 0 && !isProcessing) {
    navigate('/');
    return null; 
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault(); 
    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      toast.success("Order placed successfully! 🎉", {
        position: "top-center",
        theme: "dark",
        autoClose: 4000
      });
      navigate('/'); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Shipping & Payment Details */}
          <div className="w-full lg:w-3/5 space-y-6">
            
            {/* Shipping Box */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-amber-500 transition-colors" />
                <input required type="text" placeholder="Last Name" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-amber-500 transition-colors" />
                <input required type="email" placeholder="Email Address" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-amber-500 transition-colors md:col-span-2" />
                <input required type="text" placeholder="Street Address" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-amber-500 transition-colors md:col-span-2" />
                <input required type="text" placeholder="City" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-amber-500 transition-colors" />
                <input required type="text" placeholder="ZIP / Postal Code" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-amber-500 transition-colors" />
              </div>
            </div>

            {/* Payment Box */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineCreditCard className="text-amber-500 text-2xl" />
                <h2 className="text-xl font-bold text-white">Payment Details</h2>
              </div>
              <div className="space-y-4">
                <input required type="text" placeholder="Card Number" maxLength="16" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-amber-500 font-mono transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="MM/YY" maxLength="5" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-amber-500 font-mono transition-colors" />
                  <input required type="text" placeholder="CVC" maxLength="3" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-amber-500 font-mono transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 sticky top-24 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Order Summary</h3>
              
              {/* 3. The Item List (Scrollable if there are many items) */}
              <div className="mb-6 border-b border-slate-700 pb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                      {/* Thumbnail with quantity badge */}
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                          <img src={item.image} alt={item.title} className="max-h-full object-contain" />
                        </div>
                        <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-slate-800">
                          {item.quantity}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 truncate">{item.title}</p>
                    </div>
                    <span className="text-sm text-white font-semibold shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* 4. The Price Breakdown */}
              <div className="space-y-3 text-slate-300 mb-6 border-b border-slate-700 pb-6 text-sm">
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
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-white font-semibold">${estimatedTax.toFixed(2)}</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-3xl font-black text-amber-500">${finalTotal.toFixed(2)}</span>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-600 disabled:text-slate-400 text-slate-900 font-bold py-4 rounded-lg transition-colors shadow-lg shadow-amber-500/20 text-lg flex justify-center items-center gap-2"
              >
                {isProcessing ? "Processing..." : (
                  <>
                    <HiOutlineShieldCheck className="text-xl" />
                    Pay ${finalTotal.toFixed(2)}
                  </>
                )}
              </button>
              <p className="text-xs text-slate-500 text-center mt-4">
                Secure checkout powered by SwiftCart
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;