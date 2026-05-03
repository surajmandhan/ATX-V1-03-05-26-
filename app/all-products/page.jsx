"use client";
import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogCard from "@/components/CatalogCard";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import "../home.css"; // Correct home page styles for products

export default function AllProductsPage() {
  const { products, addToCart, updateCartQuantity, cartItems, setIsMiniCartOpen, router } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [localQuantities, setLocalQuantities] = useState({});

  const CatalogListRow = ({ product, index }) => {
    const { addToCart, updateCartQuantity, cartItems, setIsMiniCartOpen, router } = useAppContext();
    const [selectedVar, setSelectedVar] = useState(product.variants[0]);
    const [isAdded, setIsAdded] = useState(false);
    const [localQty, setLocalQty] = useState(1);

    const itemId = `${product._id}---${selectedVar.title}`;
    const inCartQty = cartItems?.[itemId] || 0;

    const handleAdd = (e) => {
      e.stopPropagation();
      if (inCartQty > 0) {
        setIsMiniCartOpen(true);
      } else {
        updateCartQuantity(itemId, localQty);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
        toast.success(`Added ${localQty} x ${selectedVar.title} to research cart`);
      }
    };

    return (
      <div 
        className="w-full bg-[#13131a]/40 backdrop-blur-md border border-white/5 rounded-2xl md:rounded-[2rem] flex flex-row items-stretch p-0 md:pr-10 hover:border-[#6366f1]/30 transition-all group cursor-pointer h-32 md:h-[11rem] overflow-hidden"
        onClick={() => router.push("/product/" + product.handle)}
      >
        {/* IMAGE - Flush Left/Top/Bottom (Slightly smaller h-32) */}
        <div className="w-32 h-32 md:w-[14rem] md:h-[11rem] bg-black/40 flex-shrink-0 flex items-center justify-center overflow-hidden border-r border-white/5 group-hover:border-[#6366f1]/20 transition-all">
          {product.image && product.image.length > 0 ? (
            <img src={product.image[0]} alt={product.name} className="w-full h-full object-contain md:object-cover" />
          ) : (
            <i className="fa-solid fa-flask text-xl md:text-3xl text-white/20"></i>
          )}
        </div>

        {/* CONTENT AREA */}
        <div className="flex-grow flex flex-col md:flex-row md:items-center p-3 md:p-0">
          
          {/* LEFT INFO STACK (Title -> Variants/Desc -> Price) */}
          <div className="md:ml-12 flex-grow flex flex-col justify-center gap-2">
            <h4 className="font-['Bebas_Neue'] text-base md:text-3xl tracking-widest text-[#e6e6eb] group-hover:text-[#6366f1] transition-colors line-clamp-1 leading-tight">
              {product.name}
            </h4>

            {/* Variants OR Description Line */}
            <div className="min-h-[20px] md:min-h-[24px]">
              {product.variants && product.variants.length > 1 ? (
                <div className="flex flex-wrap gap-1.5 md:gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedVar(v);
                      }}
                      className={`px-2 py-0.5 md:px-6 md:py-2.5 rounded-md md:rounded-xl font-['Space_Mono'] text-[9px] md:text-xs border transition-all ${selectedVar.id === v.id ? 'bg-[#6366f1] border-[#6366f1] text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-white/5 border-white/20 text-white/60 hover:border-white/40'}`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-[10px] md:text-sm text-white/40 font-['Space_Mono'] line-clamp-1 uppercase tracking-wider">
                  {product.description || "HPLC 99%+ Certified Research Compound for scientific study."}
                </div>
              )}
            </div>

            {/* Price Line (Desktop Only inside stack) */}
            <div className="hidden md:block">
              <p className="text-[#6366f1] font-['Bebas_Neue'] text-3xl tracking-widest leading-none mt-1">
                {selectedVar.displayPrice}
              </p>
            </div>
          </div>

          {/* MOBILE ONLY PRICE & VARIANTS (HIDDEN ON DESKTOP) */}
          <div className="flex md:hidden flex-col gap-1.5 mt-1.5">
             <p className="text-[#6366f1] font-['Bebas_Neue'] text-lg tracking-widest leading-none">
                {selectedVar.displayPrice}
              </p>
          </div>

          {/* RIGHT ACTION AREA */}
          <div className="mt-2 md:mt-0 ml-0 md:ml-auto flex items-center gap-2 md:gap-4 w-full md:w-auto">
            {/* QUANTITY SELECTOR */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg md:rounded-xl overflow-hidden h-7 md:h-12">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (inCartQty > 0) {
                    updateCartQuantity(itemId, inCartQty - 1);
                  } else {
                    if (localQty > 1) setLocalQty(prev => prev - 1);
                  }
                }}
                className="px-1.5 md:px-5 h-full hover:bg-white/10 text-white/60 transition-colors"
              >
                −
              </button>
              <span className="w-5 md:w-10 text-center font-['Space_Mono'] text-[10px] md:text-lg text-[#10b981] font-bold">
                {inCartQty > 0 ? inCartQty : localQty}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (inCartQty > 0) {
                    addToCart(itemId);
                  } else {
                    setLocalQty(prev => prev + 1);
                  }
                }}
                className="px-1.5 md:px-5 h-full hover:bg-white/10 text-white/60 transition-colors"
              >
                +
              </button>
            </div>

            <button 
              className={`font-['Bebas_Neue'] tracking-widest h-7 md:h-12 rounded-lg md:rounded-xl transition-all transform active:scale-95 shadow-[0_10px_25px_rgba(99,102,241,0.2)] flex items-center justify-center
                ${inCartQty > 0 
                  ? 'w-28 md:w-52 bg-[#ff0060] text-white text-[11px] md:text-xl' 
                  : 'w-28 md:w-52 bg-[#6366f1] text-white hover:bg-[#6366f1]/80 text-[11px] md:text-xl'
                }`}
              onClick={handleAdd}
            >
              {inCartQty > 0 ? "GO TO CART" : (isAdded ? "✓" : "ADD TO CART")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Unique categories fetch karne ke liye (dynamically)
  const categories = useMemo(() => {
    if (!products) return ["All"];
    return ["All", ...new Set(products.map((p) => p.category === "Peptide" ? "Peptides" : (p.category || "Peptides")))];
  }, [products]);

  // Selected category ke base par products filter karne ke liye
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === "All") return products;
    return products.filter((p) => {
      const cat = p.category === "Peptide" ? "Peptides" : (p.category || "Peptides");
      return cat === selectedCategory;
    });
  }, [products, selectedCategory]);

  return (
    <div className="home-wrapper min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-40 pb-20 px-6 max-w-[1400px] mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-[#e6e6eb] mb-4 tracking-wide">
            ALL <span className="text-[#6366f1]">PRODUCTS</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto font-['Space_Mono'] text-sm">
            Explore our complete catalog of high-purity research peptides and compounds for scientific research.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* CATEGORY FILTERS */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`hero-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>

          {/* ANIMATED VIEW TOGGLE */}
          <div className="relative flex bg-white/5 rounded-xl border border-white/10 w-48 h-10 overflow-hidden cursor-pointer group">
            {/* Sliding Pill Background - Flush Fit */}
            <div 
              className={`absolute top-0 bottom-0 w-1/2 bg-[#6366f1] transition-all duration-300 ease-out shadow-lg shadow-[#6366f1]/20 ${viewMode === "grid" ? "left-0" : "left-1/2"}`}
            />
            
            <button 
              onClick={() => setViewMode("grid")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-colors duration-300 ${viewMode === "grid" ? "text-white" : "text-white/40 hover:text-white"}`}
            >
              <i className="fa-solid fa-table-cells-large"></i>
              Grid
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-colors duration-300 ${viewMode === "list" ? "text-white" : "text-white/40 hover:text-white"}`}
            >
              <i className="fa-solid fa-list-ul"></i>
              List
            </button>
          </div>
        </div>


        <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 justify-items-center" : "flex flex-col gap-4"}>
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product, i) => (
              viewMode === "grid" ? (
                <CatalogCard key={product._id} product={product} index={i} />
              ) : (
                <CatalogListRow key={product._id} product={product} index={i} />
              )

            ))
          ) : (
            <div className="col-span-full text-center text-white/50 py-20">
              {!products || products.length === 0 ? "Loading catalog..." : "No products found in this category."}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}