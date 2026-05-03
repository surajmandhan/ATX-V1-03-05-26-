"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const MobileBottomNav = () => {
  const pathname = usePathname();
  const { setIsMiniCartOpen, getCartCount } = useAppContext();

  const navItems = [
    { name: "Products", icon: "fa-solid fa-flask-vial", path: "/" },
    { name: "Cart", icon: "fa-solid fa-bag-shopping", isCart: true },
    { name: "Wishlist", icon: "fa-solid fa-heart", path: "/wishlist" },
    { name: "Orders", icon: "fa-solid fa-box", path: "/my-orders" },
  ];


  return (
    <div className="mobile-bottom-nav lg:hidden">
      <div className="mobile-bottom-nav-inner">
        {navItems.map((item, index) => {
          if (item.isCart) {
            return (
              <button
                key={index}
                onClick={() => setIsMiniCartOpen(true)}
                className="mobile-nav-item relative"
              >
                <i className={item.icon}></i>
                <span>{item.name}</span>
                {getCartCount() > 0 && (
                  <span className="cart-badge">{getCartCount()}</span>
                )}
              </button>
            );
          }

          const isActive = pathname === item.path;

          return (
            <Link
              key={index}
              href={item.path}
              className={`mobile-nav-item ${isActive ? "active" : ""}`}
            >
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
