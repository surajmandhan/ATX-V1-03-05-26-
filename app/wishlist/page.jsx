"use client";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogCard from "@/components/CatalogCard";
import "../home.css";


export default function WishlistPage() {
  const { wishlist, products, isLoading } = useAppContext();

  // Filter products that are in the wishlist
  const wishlistedProducts = products.filter((p) => wishlist.includes(p._id));

  return (
    <div className="home-wrapper min-h-screen flex flex-col bg-[#0b0b0f]">
      <Navbar />
      <div className="flex-grow pt-40 pb-20 px-6 max-w-[1400px] mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-[#e6e6eb] mb-4 tracking-wide">
            MY <span className="text-[#ff0060]">WISHLIST</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto font-['Space_Mono'] text-sm">
            Your saved research compounds and high-purity peptides.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-white/30 font-['Space_Mono']">
            LOADING YOUR WISHLIST...
          </div>
        ) : wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 justify-items-center">

            {wishlistedProducts.map((product, index) => (
              <CatalogCard key={product._id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <i className="fa-regular fa-heart text-7xl text-white/10 mb-6"></i>
            <h2 className="font-['Bebas_Neue'] text-3xl text-white/50 tracking-widest">
              YOUR WISHLIST IS EMPTY
            </h2>
            <p className="text-white/30 font-['Space_Mono'] text-xs mt-2 uppercase">
              Start exploring our catalog to save your favorites.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="mt-10 px-8 py-3 bg-[#6366f1] text-white font-bold rounded-xl font-['Bebas_Neue'] tracking-widest text-lg hover:bg-[#22d3ee] hover:text-black transition-all"
            >
              EXPLORE PRODUCTS
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
