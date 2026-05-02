"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import MiniCart from "@/components/MiniCart";
import logoImg from "../assets/logos/newlog.png";

const Navbar = () => {
  const { router, isMiniCartOpen, setIsMiniCartOpen, getCartCount, customerToken, userData, logout } = useAppContext();
  const [isNavSticky, setIsNavSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const ticker = document.querySelector('.ticker');
      const offset = ticker ? ticker.offsetHeight : 40;
      setIsNavSticky(window.scrollY > offset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[9999] flex flex-col">
        {/* TICKER */}
        <div className={`ticker transition-all duration-300 ${isNavSticky ? "h-0 opacity-0 overflow-hidden py-0 border-none" : "h-auto opacity-100"}`}>
          <div className="ticker-inner">
            <span className="ticker-word pink">FAST</span>
            <span className="ticker-word yellow">SHIPPING</span>
            <span className="ticker-sep">✦</span>

            <span className="ticker-word cream">SECURE</span>
            <span className="ticker-word pink">CHECKOUT</span>
            <span className="ticker-sep">✦</span>

            <span className="ticker-word yellow">TRUSTED</span>
            <span className="ticker-word cream">SUPPLIERS</span>
            <span className="ticker-sep">✦</span>

            <span className="ticker-word pink">LAB</span>
            <span className="ticker-word yellow">TESTED</span>
            <span className="ticker-sep">✦</span>

            {/* Repeat for continuous loop effect if necessary, but the CSS usually handles it */}
            <span className="ticker-word pink">FAST</span>
            <span className="ticker-word yellow">SHIPPING</span>
            <span className="ticker-sep">✦</span>

            <span className="ticker-word cream">SECURE</span>
            <span className="ticker-word pink">CHECKOUT</span>
            <span className="ticker-sep">✦</span>

            <span className="ticker-word yellow">TRUSTED</span>
            <span className="ticker-word cream">SUPPLIERS</span>
            <span className="ticker-sep">✦</span>

            <span className="ticker-word pink">LAB</span>
            <span className="ticker-word yellow">TESTED</span>
            <span className="ticker-sep">✦</span>
          </div>
        </div>


        {/* NAV */}
        <nav className={`home-nav w-full transition-all duration-300 ${isNavSticky ? "bg-gray-900 shadow-lg" : "bg-[#0b0b0f] lg:bg-transparent"} px-4 md:px-10 py-3 md:py-4`}>
          <Link href="/" className="nav-logo">
            <img src={logoImg?.src || logoImg} alt="ATX Peptides Logo" className="h-14 md:h-16 w-auto object-contain" />
          </Link>

          <ul className="nav-links">
            <li className="hidden lg:block"><Link href="/all-products">Products</Link></li>


            <li className="hidden lg:block"><Link href="/about">About</Link></li>
            <li className="hidden lg:block"><Link href="/contact">Contact</Link></li>

            <li className="hidden lg:block">
              <a onClick={() => setIsMiniCartOpen(true)} className="cart-link" style={{cursor: "pointer", background: "var(--electric-yellow, #eab308)", color: "var(--dark, #0b0b0f)"}}>
                Cart <i className="fa-solid fa-bag-shopping"></i>
                {getCartCount() > 0 && <span style={{fontSize:'0.8rem', marginLeft:'4px'}}>({getCartCount()})</span>}
              </a>
            </li>

            <li>
              {customerToken ? (
                <div className="relative group">
                  <button 
                    className="flex items-center gap-2 text-white hover:text-[#6366f1] transition-all cursor-pointer py-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#22d3ee] flex items-center justify-center text-black font-bold text-xs uppercase shadow-[0_0_15px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all">
                      {userData?.firstName?.charAt(0) || <i className="fa-solid fa-user"></i>}
                    </div>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[10000] overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white font-['Bebas_Neue'] tracking-wide text-lg truncate">
                        {userData?.firstName} {userData?.lastName}
                      </p>
                      <p className="text-white/40 font-['Space_Mono'] text-[10px] truncate">{userData?.email}</p>
                    </div>
                    
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      <i className="fa-solid fa-user-gear text-xs text-[#6366f1]"></i>
                      <span className="font-['Space_Mono'] text-xs uppercase tracking-wider">Profile Settings</span>
                    </Link>
                    
                    <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      <i className="fa-solid fa-heart text-xs text-[#ff0060]"></i>
                      <span className="font-['Space_Mono'] text-xs uppercase tracking-wider">My Wishlist</span>
                    </Link>
                    
                    <Link href="/my-orders" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      <i className="fa-solid fa-box text-xs text-[#22d3ee]"></i>
                      <span className="font-['Space_Mono'] text-xs uppercase tracking-wider">My Orders</span>
                    </Link>
                    
                    <button 
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all cursor-pointer border-t border-white/5"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                      <span className="font-['Space_Mono'] text-xs uppercase tracking-wider">Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login" style={{cursor:'pointer'}}>Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />
    </>
  );
};

export default Navbar;
