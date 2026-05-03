"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { getProduct } from "@/lib/shopify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import toast from "react-hot-toast";
import "./product.css";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id: handle } = useParams(); 
  const { addToCart, updateCartQuantity, cartItems, currency, toggleWishlist, isInWishlist, setIsMiniCartOpen } = useAppContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [localQty, setLocalQty] = useState(1);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(handle);
        setProduct(data);
        if (data?.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    };
    if (handle) fetchSingleProduct();
  }, [handle]);

  if (loading) return (
    <div className="min-h-screen bg-[#0b0b0f] flex flex-col text-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center text-2xl font-bold">Loading Product...</div>
      <Footer />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#0b0b0f] flex flex-col text-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center text-2xl font-bold">Product Not Found</div>
      <Footer />
    </div>
  );

  const activeVariant = selectedVariant || product.variants[0];
  const itemId = `${product._id}---${activeVariant.title}`;
  const inCartQty = cartItems[itemId] || 0;
  const isProductInCart = inCartQty > 0;
  const isWishlisted = isInWishlist(product._id);

  const handleAdd = () => {
    if (isProductInCart) {
      setIsMiniCartOpen(true);
    } else {
      updateCartQuantity(itemId, localQty);
      toast.success(`${localQty} ${activeVariant.title} added to cart`);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };



  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-40 pb-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="bg-[#13131a]/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl">
          
          {/* LEFT: INSET IMAGE SECTION */}
          <div className="w-full lg:w-1/2 p-6 pr-0 flex items-stretch">
            <div className="w-full bg-black/40 rounded-[1.5rem] border border-white/5 flex items-center justify-center group overflow-hidden relative">
              <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] transition-transform duration-700 group-hover:scale-105 flex items-center justify-center p-8">
                {product.image && product.image.length > 0 ? (
                  <img 
                    src={product.image[0]} 
                    alt={product.name} 
                    className="max-w-full max-h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <i className="fa-solid fa-flask text-8xl"></i>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* RIGHT: DETAILS SECTION */}
          <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#6366f1] font-['Space_Mono'] text-[10px] tracking-[0.3em] uppercase">
                {product.category || "Research Compound"}
              </span>
              <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl leading-none text-white tracking-wider">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-3xl md:text-4xl font-['Bebas_Neue'] text-[#6366f1] tracking-widest">
                  {activeVariant.displayPrice}
                </p>
                {activeVariant.title !== "Default Title" && (
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white/40 font-['Space_Mono'] text-xs">
                    {activeVariant.title}
                  </span>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#6366f1]/30 to-transparent"></div>

            {/* VARIANT SELECTION */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-4">
                <p className="text-[10px] font-['Space_Mono'] text-white/40 uppercase tracking-widest">Select Specification</p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVariant(v);
                        setLocalQty(1); // Reset local qty on switch
                      }}
                      className={`px-6 py-2 rounded-xl font-['Space_Mono'] text-xs border transition-all ${selectedVariant?.id === v.id ? 'bg-[#6366f1] border-[#6366f1] text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white'}`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div 
              className="font-['Space_Mono'] text-sm leading-relaxed text-white/60 max-w-xl"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {/* QUANTITY SELECTOR */}
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden h-14">
                    <button 
                      onClick={() => {
                        if (isProductInCart) {
                          if (inCartQty > 0) updateCartQuantity(itemId, inCartQty - 1);
                        } else {
                          if (localQty > 1) setLocalQty(prev => prev - 1);
                        }
                      }}
                      className="px-6 h-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-['Space_Mono'] text-lg text-[#6366f1] font-bold">
                      {isProductInCart ? inCartQty : localQty}
                    </span>
                    <button 
                      onClick={() => {
                        if (isProductInCart) {
                          addToCart(itemId);
                        } else {
                          setLocalQty(prev => prev + 1);
                        }
                      }}
                      className="px-6 h-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  {/* WISHLIST BUTTON */}
                  <button 
                    onClick={() => toggleWishlist(product._id)}
                    className={`w-14 h-14 rounded-xl border flex-shrink-0 flex items-center justify-center transition-all transform active:scale-90 ${isWishlisted ? 'bg-[#ff0060]/10 border-[#ff0060]/30 text-[#ff0060]' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <i className={`fa-heart text-xl ${isWishlisted ? 'fa-solid' : 'fa-regular'}`}></i>
                  </button>
                </div>

                <button 
                  onClick={handleAdd}
                  className={`w-full font-['Bebas_Neue'] text-2xl tracking-widest h-14 rounded-2xl transition-all transform active:scale-95 shadow-[0_20px_40px_rgba(99,102,241,0.2)] ${isProductInCart ? 'bg-[#ff0060] text-white' : 'bg-[#6366f1] text-white hover:bg-[#6366f1]/80'}`}
                >
                  {isProductInCart ? "GO TO CART" : (isAdded ? "ADDED ✓" : "ADD TO RESEARCH CART")}
                </button>
              </div>





              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group hover:border-[#6366f1]/30 transition-colors">
                  <i className="fa-solid fa-shield-virus text-[#6366f1] text-xl"></i>
                  <p className="text-[10px] font-['Space_Mono'] text-white/40 uppercase">Sterility Guaranteed</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group hover:border-[#22d3ee]/30 transition-colors">
                  <i className="fa-solid fa-truck-fast text-[#22d3ee] text-xl"></i>
                  <p className="text-[10px] font-['Space_Mono'] text-white/40 uppercase">Discreet Shipping</p>
                </div>
              </div>

              {/* MOVED INFO BAR */}
              <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-[#6366f1]/20 flex items-center justify-center text-[#6366f1]">
                     <i className="fa-solid fa-microscope"></i>
                   </div>
                   <div>
                     <p className="text-[10px] font-['Space_Mono'] text-white/40 uppercase">Purity Level</p>
                     <p className="text-sm font-['Bebas_Neue'] tracking-widest text-white">99%+ HPLC CERTIFIED</p>
                   </div>
                </div>
                <div className="h-8 w-px bg-white/10"></div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-[#22d3ee]/20 flex items-center justify-center text-[#22d3ee]">
                     <i className="fa-solid fa-temperature-arrow-down"></i>
                   </div>
                   <div>
                     <p className="text-[10px] font-['Space_Mono'] text-white/40 uppercase">Storage</p>
                     <p className="text-sm font-['Bebas_Neue'] tracking-widest text-white">2-8°C REFRIGERATED</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}