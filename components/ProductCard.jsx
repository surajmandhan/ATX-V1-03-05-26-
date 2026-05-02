"use client";
import React, { useState } from "react";
import { placeholder } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { router, addToCart, wishlist, toggleWishlist, isInWishlist } = useAppContext();
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product._id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const itemId = product.size ? `${product._id}---${product.size}` : product._id;
    addToCart(itemId);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product._id);
  };

  const cardClasses = ["card-metabolic", "card-longevity", "card-weight", "card-growth"];
  const cardClass = cardClasses[Math.floor(Math.random() * cardClasses.length)];

  return (
    <a
      onClick={() => router.push("/product/" + product.handle)}
      className={`atx-products-card ${cardClass} cursor-pointer group`}
    >
      <span className="card-chip" style={{ color: '#000' }}>{product.category || 'Compound'}</span>
      
      <button 
        onClick={handleWishlist}
        className="absolute top-4 left-4 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-all"
      >
        <svg 
          className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-white/50 hover:text-white'}`} 
          fill={isWishlisted ? 'currentColor' : 'none'}
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <div className="card-img-placeholder">
        <Image
          src={product.image?.[0] || placeholder}
          alt={product.name}
          className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
          width={250}
          height={250}
          unoptimized={true}
        />
      </div>

      <div className="card-bottom">
        <div 
          className="card-name line-clamp-2 overflow-hidden text-ellipsis"
          style={{ lineHeight: "1.1", marginBottom: "8px" }}
          title={product.name}
        >
          {product.name}
        </div>
        
        <div className="card-desc line-clamp-2">
          {product.description || "Premium research peptide for scientific study."}
        </div>

        <div className="card-footer">
          <div className="card-price">
            {product.displayPrice} {product.size ? `/ ${product.size}` : ''}
          </div>
          <button 
            onClick={handleAddToCart}
            className="card-btn"
          >
            {isAdded ? 'Added ✓' : 'Add'}
          </button>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
