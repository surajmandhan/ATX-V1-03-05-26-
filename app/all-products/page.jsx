"use client";
import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import "../home.css"; // Correct home page styles for products

export default function AllProductsPage() {
  const { products, addToCart, router } = useAppContext();
  const [addedItems, setAddedItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Unique categories fetch karne ke liye (dynamically)
  const categories = useMemo(() => {
    if (!products) return ["All"];
    return ["All", ...new Set(products.map((p) => p.category || "Peptide"))];
  }, [products]);

  // Selected category ke base par products filter karne ke liye
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === "All") return products;
    return products.filter((p) => (p.category || "Peptide") === selectedCategory);
  }, [products, selectedCategory]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    target.style.transform = "scale(1.2)";
    setTimeout(() => {
      if (target) target.style.transform = "scale(1)";
    }, 200);
    const itemId = product.size ? `${product._id}---${product.size}` : product._id;
    addToCart(itemId);
    setAddedItems((prev) => ({ ...prev, [product._id]: true }));
  };

  const renderCardClass = (index) => {
    const classes = ["card-metabolic", "card-longevity", "card-weight", "card-growth"];
    return classes[index % classes.length];
  };

  const renderCardIcon = (index) => {
    const icons = ["fa-vial", "fa-flask", "fa-dna", "fa-atom"];
    return icons[index % icons.length];
  };

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

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product, i) => (
              <a
                key={product._id}
                className={`atx-products-card ${renderCardClass(i)}`}
                onClick={() => router.push("/product/" + product.handle)}
              >
                <span className="card-chip" style={{ color: '#000' }}>{product.category || 'Peptide'}</span>
                <div className="card-img-placeholder">
                  {product.image && product.image.length > 0 ? (
                    <img src={product.image[0]} alt={product.name} className="w-full h-full object-contain" />
                  ) : (
                    <i className={`fa-solid ${renderCardIcon(i)}`}></i>
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
                {product.name.length < 25 && (
                  <div className="card-desc line-clamp-2">{product.description || "Premium research peptide."}</div>
                )}
                  <div className="card-footer">
                    <div className="card-price">{product.displayPrice} {product.size ? `/ ${product.size}` : ''}</div>
                    <button className="card-btn" onClick={(e) => handleAddToCart(e, product)}>
                      {addedItems[product._id] ? "Added ✓" : "Add"}
                    </button>
                  </div>
                </div>
              </a>
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