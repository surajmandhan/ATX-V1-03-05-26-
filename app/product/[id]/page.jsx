"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { getProduct } from "@/lib/shopify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import toast from "react-hot-toast";
import "./product.css";

export default function ProductDetailPage() {
  const { id: handle } = useParams(); // Using the param as handle
  const { addToCart, currency, toggleWishlist, isInWishlist } = useAppContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = product ? isInWishlist(product._id) : false;

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(handle);
        setProduct(data);
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

  const handleAdd = () => {
    addToCart(product._id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex flex-col">
      <Navbar />
      
      <div className="pdp-container mt-40 mb-20">
        <div className="pdp-grid">
          {/* LEFT: IMAGE */}
          <div className="pdp-img-wrap relative">
             <button 
              onClick={() => toggleWishlist(product._id)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 transition-all group"
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <i className={`fa-heart text-xl transition-colors ${isWishlisted ? 'fa-solid text-[#ff0060]' : 'fa-regular text-white group-hover:text-[#ff0060]'}`}></i>
            </button>
            <Image 
              src={product.image?.[0] || "/placeholder.png"} 
              alt={product.name} 
              width={500} 
              height={500} 
              className="pdp-img"
              unoptimized={true}
            />
          </div>

          {/* RIGHT: CONTENT */}
          <div className="pdp-content space-y-6">
            <p className="text-[#6366f1] font-['Space_Mono'] text-xs tracking-[0.3em] uppercase">{product.category}</p>
            <h1 className="pdp-title">{product.name}</h1>
            <p className="pdp-price">{product.displayPrice}</p>
            
            <div className="pdp-desc" dangerouslySetInnerHTML={{ __html: product.description }}></div>
            
            {product.size && (
              <div className="mb-6">
                <span className="size-label">RESEARCH SIZE</span>
                <div className="size-options">
                  <button className="size-btn active">{product.size}</button>
                </div>
              </div>
            )}

            <div className="pdp-btns">
              <button onClick={handleAdd} className="btn-cart">
                {isAdded ? "ADDED TO CART ✓" : "ADD TO RESEARCH CART"}
              </button>
              
              <button 
                onClick={() => toggleWishlist(product._id)}
                className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
              >
                <i className={`fa-heart ${isWishlisted ? 'fa-solid' : 'fa-regular'}`}></i>
                {isWishlisted ? "IN WISHLIST" : "WISHLIST"}
              </button>
            </div>

            <div className="pdp-info">
              <div>
                <span>CAS NUMBER</span>
                <span>AVAIL-RESEARCH-01</span>
              </div>
              <div>
                <span>PURITY</span>
                <span>99%+ HPLC TESTED</span>
              </div>
              <div>
                <span>STORAGE</span>
                <span>2-8°C REFRIGERATED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}