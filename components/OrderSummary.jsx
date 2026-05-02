"use client";
import { useAppContext } from "@/context/AppContext";
import React, { useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const {
    currency,
    getCartCount,
    getCartAmount,
    customerToken,
    processCheckout
  } = useAppContext();

  const [orderStatus, setOrderStatus] = useState("idle"); // idle, processing, success, error

  const handlePlaceOrder = async () => {
    if (!customerToken) {
      toast.error("Please login to proceed with checkout");
      window.location.href = "/login?redirect=cart";
      return;
    }
    setOrderStatus("processing");
    try {
      await processCheckout();
      setOrderStatus("success");
    } catch (error) {
      setOrderStatus("error");
      toast.error("Checkout failed. Please try again.");
      setTimeout(() => setOrderStatus("idle"), 2500);
    }
  };

  return (
    <>
      {/* FULLSCREEN LOADER OVERLAY */ }
      {orderStatus !== "idle" && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0b0b0f]/95 backdrop-blur-md transition-all duration-500">
          <style>{`
            .atx-path { stroke-dasharray: 275; stroke-dashoffset: 0; animation: atx-load 1.75s ease-in-out infinite; transform-origin: 50px 50px; }
            .atx-spinner { animation: atx-spin 1.75s linear infinite; transform-origin: 50px 50px; }
            .atx-path-complete { stroke-dasharray: 800; stroke-dashoffset: 0; transition: all 1s ease-out; animation: none; }
            .atx-check, .atx-cross { stroke-dasharray: 110; stroke-dashoffset: 110; stroke-width: 0; }
            .atx-check-complete, .atx-cross-complete { animation: atx-check 1s ease-in forwards; stroke-width: 8; stroke-dashoffset: 0; }
            @keyframes atx-load {
              0% { stroke-dashoffset: 273; }
              50% { stroke-dashoffset: 68.25; transform: rotate(135deg); }
              100% { stroke-dashoffset: 273; transform: rotate(450deg); }
            }
            @keyframes atx-check { 0% { stroke-dashoffset: -110; } 100% { stroke-dashoffset: 0; } }
            @keyframes atx-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            .atx-success { stroke: #22d3ee; transition: stroke .6s; }
            .atx-danger { stroke: #ff0060; transition: stroke .6s; }
          `}</style>
          
          <div className="relative w-32 h-32 mb-6">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <g className={orderStatus === 'success' || orderStatus === 'error' ? '' : 'atx-spinner'}>
                <circle 
                  className={`atx-path ${orderStatus === 'success' ? 'atx-path-complete atx-success' : ''} ${orderStatus === 'error' ? 'atx-path-complete atx-danger' : ''}`} 
                  fill="none" stroke="#6366f1" strokeWidth="7" strokeMiterlimit="10" strokeLinecap="round" cx="50" cy="50" r="44" 
                />
              </g>
              <polyline 
                className={`atx-check ${orderStatus === 'success' ? 'atx-check-complete atx-success' : ''}`} 
                fill="none" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" strokeMiterlimit="10" strokeLinejoin="round" points="70,35 45,65 30,52" 
              />
              <path 
                className={`atx-cross ${orderStatus === 'error' ? 'atx-cross-complete atx-danger' : ''}`} 
                fill="none" stroke="#ff0060" strokeWidth="8" strokeLinecap="round" strokeMiterlimit="10" d="M70,30 l-40,40 M70,70 l-40,-40" 
              />
            </svg>
          </div>
          
          <h3 className="text-4xl font-['Bebas_Neue'] tracking-widest text-[#e6e6eb] animate-pulse mb-2 text-center">
            {orderStatus === 'processing' && 'REDIRECTING TO CHECKOUT...'}
            {orderStatus === 'success' && <span className="text-[#22d3ee]">REDIRETING...</span>}
            {orderStatus === 'error' && <span className="text-[#ff0060]">ORDER FAILED</span>}
          </h3>
          
          <p className="text-white/50 font-['Space_Mono'] text-sm mt-2 text-center px-4 max-w-sm">
            {orderStatus === 'processing' && 'Please wait while we prepare your secure checkout.'}
            {orderStatus === 'success' && 'Opening Shopify payment page...'}
            {orderStatus === 'error' && 'Something went wrong, please try again.'}
          </p>
        </div>
      )}

      <div className="w-full max-w-xl bg-[#13131a] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl mx-auto text-white">
        <h2 className="text-4xl font-['Bebas_Neue'] tracking-widest text-[#e6e6eb] mb-8">
          ORDER <span className="text-[#6366f1]">SUMMARY</span>
        </h2>

      <div className="space-y-8">
        {/* INFO BOX */}
        <div className="bg-black/20 p-5 sm:p-6 rounded-2xl border border-white/5">
          <p className="text-white/40 font-['Space_Mono'] text-xs text-center">
            Payment and Shipping details will be collected securely on the Shopify Checkout page.
          </p>
        </div>

        {/* TOTALS */}
        <div className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4 font-['Space_Mono'] text-sm">
          <div className="flex justify-between items-center">
            <p className="text-white/50 uppercase tracking-wider text-xs">Items ({getCartCount()})</p>
            <p className="text-[#e6e6eb] font-bold">{currency}{getCartAmount().toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-white/50 uppercase tracking-wider text-xs">Shipping</p>
            <p className="text-[#22d3ee] font-bold">Calculated at Checkout</p>
          </div>
          <div className="flex justify-between items-end border-t border-white/10 pt-5 mt-2">
            <p className="text-white/70 uppercase tracking-widest text-xs">Subtotal</p>
            <p className="text-4xl font-['Bebas_Neue'] tracking-widest text-[#6366f1] leading-none">
              {currency}{getCartAmount().toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {!customerToken && (
        <div className="mt-8 p-4 bg-[#ff0060]/10 border border-[#ff0060]/20 rounded-2xl animate-pulse">
          <p className="text-[#ff0060] font-['Bebas_Neue'] text-lg tracking-widest text-center">
            PLEASE LOGIN BEFORE CHECKOUT
          </p>
        </div>
      )}

      <button
        onClick={handlePlaceOrder}
        className={`w-full ${!customerToken ? 'mt-4' : 'mt-8'} font-['Bebas_Neue'] text-2xl tracking-widest py-4 rounded-xl bg-[#6366f1] text-white hover:bg-[#ff0060] transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(255,0,96,0.5)] cursor-pointer border-none`}
      >
        {customerToken ? 'Proceed to Payment →' : 'LOGIN TO CHECKOUT →'}
      </button>
      </div>
    </>
  );
};

export default OrderSummary;
