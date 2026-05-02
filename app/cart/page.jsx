"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { placeholder } from "@/assets/assets";
import Image from "next/image";
import OrderSummary from "@/components/OrderSummary";
import AddressModal from "@/components/AddressModal";
import toast from "react-hot-toast";
import "./cart.css";
import "../home.css";

export default function CartPage() {
  const { 
    getCartCount, 
    cartItems,
    products,
    updateCartQuantity,
    isLoading,
    userData,
    customerToken,
    setUserData
  } = useAppContext();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  
  const cartProductIds = Object.keys(cartItems).filter(id => cartItems[id] > 0);

  const handleSaveAddress = async (addressData) => {
    try {
      const { customerAddressCreate, customerAddressUpdate, customerDefaultAddressUpdate } = await import("@/lib/shopify");
      let result;
      if (addressData.id) {
        result = await customerAddressUpdate(customerToken, addressData.id, addressData);
      } else {
        result = await customerAddressCreate(customerToken, addressData);
      }

      if (result.customerAddress) {
        // Automatically set as default
        await customerDefaultAddressUpdate(customerToken, result.customerAddress.id);
        
        // Refresh customer data
        const { getCustomer } = await import("@/lib/shopify");
        const updatedUser = await getCustomer(customerToken);
        setUserData(updatedUser);
        toast.success("Address saved as default");
      } else {
        const error = result.customerUserErrors?.[0]?.message || "Failed to save address";
        toast.error(error);
      }
    } catch (error) {
      console.error("Address save error:", error);
      toast.error("An error occurred while saving address");
    }
  };

  const shippingAddress = userData?.addresses?.find(addr => addr.id === userData?.defaultAddress?.id) || userData?.addresses?.[0] || null;

  if (isLoading && cartProductIds.length > 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0b0b0f] text-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-2xl font-['Bebas_Neue'] tracking-widest">
          Syncing your cart...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0f] text-white">
      <link
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
      />

      <Navbar />

      <main className="cart-main-wrapper">
        <div className="cart-container">
          {/* MOBILE HEADER */}
          <div className="cart-header-mobile">
            <button className="back-btn" onClick={() => router.back()}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h1 className="cart-main-title">My Cart</h1>
            <div className="cart-header-spacer"></div>
          </div>


          {/* DELIVERY LOCATION */}
          <div className="delivery-section">
            <div className="delivery-info">
              <span className="delivery-label">Delivery Location</span>
              <h3 className="delivery-name">{shippingAddress ? 'Home' : 'Not Set'}</h3>
            </div>
            <button 
              className="change-loc-btn"
              onClick={() => {
                setCurrentAddress(shippingAddress);
                setIsAddressModalOpen(true);
              }}
            >
              {shippingAddress ? 'Change Location' : 'Add Address'}
            </button>
          </div>

          <div className="cart-grid">
            {/* LEFT: CART ITEMS */}
            <div className="cart-items-column">
              {cartProductIds.length === 0 ? (
                <div className="empty-cart-view">
                  <i className="fa-solid fa-cart-arrow-down"></i>
                  <h2>Your cart is empty</h2>
                  <Link href="/all-products" className="shop-now-btn">Shop Now</Link>
                </div>
              ) : (
                cartProductIds.map(itemId => {
                  const [baseId] = itemId.split('---');
                  const product = products.find(p => p._id === baseId);
                  if (!product) return null;
                  
                  const quantity = cartItems[itemId];
                  const priceNum = parseFloat(product.price || 0);
                  const itemTotal = (priceNum * quantity).toFixed(2);

                  return (
                    <div className="new-cart-item" key={itemId}>
                      <div className="item-img-box">
                        <Image src={product.image?.[0] || placeholder} alt={product.name} width={100} height={100} className="object-contain" unoptimized={true} />
                      </div>
                      <div className="item-details">
                        <div className="item-header">
                          <h4 className="item-title">{product.name}</h4>
                          <button className="item-delete-btn" onClick={() => updateCartQuantity(itemId, 0)}>
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                        <p className="item-unit-price">Price: {product.displayPrice}</p>
                        
                        <div className="item-actions-row">
                          <div className="new-qty-selector">
                            <button onClick={() => updateCartQuantity(itemId, quantity - 1)}>−</button>
                            <span>{quantity}</span>
                            <button onClick={() => updateCartQuantity(itemId, quantity + 1)}>+</button>
                          </div>
                          <div className="item-total-price">{product.currency || '$'}{itemTotal}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* RIGHT: SUMMARY & CHECKOUT */}
            <div className="cart-summary-column">
              <OrderSummary />
            </div>

          </div>
        </div>
      </main>

      <AddressModal 
        isOpen={isAddressModalOpen} 
        onClose={() => setIsAddressModalOpen(false)} 
        onSave={handleSaveAddress}
        currentAddress={currentAddress}
      />

      <Footer />
    </div>
  );
}