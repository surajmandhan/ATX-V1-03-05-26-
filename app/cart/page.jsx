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

      <main className="flex-grow pt-40 pb-20 px-6 w-full">
        <div className="cart-container max-w-[1280px] mx-auto">
          <div className="cart-title">Your Cart</div>
          <div className="cart-sub">{getCartCount()} {getCartCount() === 1 ? 'Item' : 'Items'}</div>

          <div className="cart-grid">
            {/* LEFT: CART ITEMS */}
            <div className="flex-grow">
              {cartProductIds.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,0.5)" }}>
                  <i className="fa-solid fa-cart-arrow-down" style={{ fontSize: "3rem", marginBottom: "20px" }}></i>
                  <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest">Your cart is currently empty.</h2>
                </div>
              ) : (
                cartProductIds.map(itemId => {
                  const [baseId] = itemId.split('---');
                  const product = products.find(p => p._id === baseId);
                  if (!product) return null;
                  
                  const quantity = cartItems[itemId];

                  return (
                    <div className="cart-item" key={itemId} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "20px", padding: "20px", marginBottom: "15px", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-6 flex-wrap sm:flex-nowrap">
                        <div className="w-[100px] h-[100px] bg-black/20 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/10">
                          <Image src={product.image?.[0] || placeholder} alt={product.name} width={100} height={100} className="object-contain" unoptimized={true} />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-['Bebas_Neue'] text-2xl tracking-widest text-[#e6e6eb] mb-1">{product.name}</h4>
                          <div className="text-[#22d3ee] font-['Space_Mono'] text-lg mb-4">{product.displayPrice}</div>
                          
                          <div className="flex items-center gap-6">
                            <div className="flex items-center border border-white/20 rounded-full px-2 py-1 bg-black/30">
                              <button className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer" onClick={() => updateCartQuantity(itemId, quantity - 1)}>−</button>
                              <div className="px-4 font-bold text-white min-w-[30px] text-center">{quantity}</div>
                              <button className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer" onClick={() => updateCartQuantity(itemId, quantity + 1)}>+</button>
                            </div>
                            <div className="text-white/40 hover:text-[#ff0060] cursor-pointer transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold" onClick={() => updateCartQuantity(itemId, 0)}>
                              <i className="fa-solid fa-trash-can"></i> Remove
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              <Link href="/all-products" className="continue" style={{ marginTop: "30px", display: "inline-block" }}>← Continue Shopping</Link>
            </div>

            {/* RIGHT: ORDER SUMMARY & ADDRESS */}
            <div className="w-full lg:w-[450px] space-y-8">
              {/* SHIPPING ADDRESS SECTION */}
              {userData && (
                <div className="bg-white/5 border border-white/10 rounded-[30px] p-8 backdrop-blur-md">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-['Bebas_Neue'] text-2xl tracking-widest text-white/80">SHIPPING ADDRESS</h3>
                    <button 
                      onClick={() => {
                        setCurrentAddress(shippingAddress);
                        setIsAddressModalOpen(true);
                      }}
                      className="text-[#6366f1] hover:text-[#22d3ee] font-bold text-xs tracking-widest uppercase transition-colors"
                    >
                      {shippingAddress ? 'CHANGE' : 'ADD ADDRESS'}
                    </button>
                  </div>

                  {shippingAddress ? (
                    <div className="space-y-2 font-['Space_Mono'] text-sm text-white/60">
                      <p className="text-white font-bold">{shippingAddress.firstName} {shippingAddress.lastName}</p>
                      <p>{shippingAddress.address1}{shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</p>
                      <p>{shippingAddress.city}, {shippingAddress.province} - {shippingAddress.zip}</p>
                      <p>{shippingAddress.country}</p>
                      <p className="pt-2 text-white/40">{shippingAddress.phone}</p>
                    </div>
                  ) : (
                    <div className="py-4 text-white/30 text-center border-2 border-dashed border-white/5 rounded-2xl">
                      No shipping address found.
                    </div>
                  )}
                </div>
              )}
              
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