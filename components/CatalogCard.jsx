"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const CatalogCard = ({ product, index }) => {
  const { addToCart, updateCartQuantity, cartItems, router, currency } = useAppContext();
  
  // Default to the first variant
  const [selectedVar, setSelectedVar] = useState(product.variants?.[0] || { 
    id: product.variantId, 
    title: product.size || "Default", 
    displayPrice: product.displayPrice 
  });
  
  const [isAdded, setIsAdded] = useState(false);

  // Cart Status Logic
  const itemId = `${product._id}---${selectedVar.title}`;
  const inCartQty = cartItems?.[itemId] || 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(itemId);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const renderCardClass = (idx) => {
    const classes = ["card-metabolic", "card-longevity", "card-weight", "card-growth"];
    return classes[idx % classes.length];
  };

  const renderCardIcon = (idx) => {
    const icons = ["fa-vial", "fa-flask", "fa-dna", "fa-atom"];
    return icons[idx % icons.length];
  };

  return (
    <a
      className={`atx-products-card plp-card ${renderCardClass(index)} group`}
      onClick={() => router.push("/product/" + product.handle)}
    >
      <span className="card-chip" style={{ color: '#000' }}>{product.category || 'Peptide'}</span>
      
      <div className="card-img-placeholder">
        {product.image && product.image.length > 0 ? (
          <img src={product.image[0]} alt={product.name} className="w-full h-full object-contain" />
        ) : (
          <i className={`fa-solid ${renderCardIcon(index)}`}></i>
        )}
      </div>

      <div className="card-bottom">
        <div 
          className="card-name line-clamp-2 overflow-hidden text-ellipsis"
          style={{ lineHeight: "1.1", marginBottom: "8px" }}
          title={product.name}
        >
          {product.name}
        </div>
        
        {/* VARIANT OR DESCRIPTION - Dynamic Content */}
        <div className="mb-4 mt-2 min-h-[32px]">
          {product.variants && product.variants.length > 1 ? (
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVar(v);
                  }}
                  className={`px-2 py-1 rounded-md font-['Space_Mono'] text-[9px] border transition-all ${selectedVar.id === v.id ? 'bg-[#6366f1] border-[#6366f1] text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white'}`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-[10px] text-white/40 font-['Space_Mono'] line-clamp-2 leading-tight uppercase tracking-wider">
              {product.description || "HPLC 99%+ Certified Research Compound for scientific study."}
            </div>
          )}
        </div>

        <div className="card-footer flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mt-4">
          <div className="card-price text-center md:text-left">
            {selectedVar.displayPrice} 
            {selectedVar.title !== "Default Title" && <span className="text-[10px] text-white/30 ml-1">/ {selectedVar.title}</span>}
          </div>

          <div className="flex items-center justify-center md:justify-end w-full md:w-auto">
            {inCartQty > 0 ? (
              <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden h-9 md:h-11 w-full md:w-32 justify-between transition-all">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateCartQuantity(itemId, inCartQty - 1);
                  }}
                  className="px-2 md:px-3 h-full hover:bg-white/10 text-white/60 transition-colors"
                >
                  −
                </button>
                <span className="flex-grow text-center font-['Space_Mono'] text-sm md:text-base text-[#10b981] font-bold">
                  {inCartQty}
                </span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(itemId);
                  }}
                  className="px-2 md:px-3 h-full hover:bg-white/10 text-white/60 transition-colors"
                >
                  +
                </button>
              </div>
            ) : (
              <button className="card-btn w-full md:w-auto md:px-6 py-2.5 md:py-2.5 text-center flex justify-center items-center md:text-sm font-bold uppercase tracking-wider" onClick={handleAddToCart}>
                {isAdded ? "Added ✓" : "ADD TO CART"}
              </button>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default CatalogCard;
