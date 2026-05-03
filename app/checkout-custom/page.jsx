"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import toast from "react-hot-toast";
import { placeholder, assets } from "@/assets/assets";

export default function CustomCheckoutPage() {
  const { 
    cartItems, 
    products, 
    getCartAmount, 
    userData, 
    customerToken, 
    setCartItems,
    clearCart,
    router,
    currency 
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderName, setOrderName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  // Form States
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("USA");
  const [province, setProvince] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // Populate from user data if available
  useEffect(() => {
    if (userData) {
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      
      const addr = userData.defaultAddress || userData.addresses?.[0];
      if (addr) {
        setAddress1(addr.address1 || "");
        setAddress2(addr.address2 || "");
        setCity(addr.city || "");
        setZip(addr.zip || "");
        setCountry("USA");
        setProvince(addr.province || "");
      }
    }
  }, [userData]);

  const cartTotal = getCartAmount();
  const lineItems = Object.keys(cartItems)
    .filter(id => cartItems[id] > 0)
    .map(itemId => {
      const [baseId, variantTitle] = itemId.split('---');
      const product = products.find(p => p._id === baseId);
      let variantId = product?.variantId;
      let displayTitle = product?.name;
      let displaySize = product?.size;

      if (variantTitle && product?.variants) {
        const specificVariant = product.variants.find(v => v.title === variantTitle);
        if (specificVariant) {
          variantId = specificVariant.id;
          displaySize = specificVariant.title;
        }
      }

      return {
        id: itemId,
        variantId,
        name: displayTitle,
        size: displaySize,
        price: product?.price || 0,
        quantity: cartItems[itemId],
        image: product?.image?.[0] || placeholder
      };
    })
    .filter(item => item.variantId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!firstName || !lastName || !address1 || !city || !zip) {
      toast.error("Please fill in all required shipping fields");
      return;
    }
    if (!/^\d{5}(-\d{4})?$/.test(zip) && country === "USA") {
      toast.error("Please enter a valid US Zip Code (5 digits)");
      return;
    }
    if (!transactionId) {
      toast.error("Please enter your Payment Transaction ID");
      return;
    }

    const finalPhone = phone;

    setLoading(true);
    try {
      const response = await fetch("/api/checkout-custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lineItems,
          customer: { email, phone: finalPhone },
          address: { firstName, lastName, address1, address2, city, zip, country: "USA", province },
          transactionId
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setOrderName(data.order.name);
        clearCart();
        toast.success("Order placed successfully!");
      } else {
        toast.error(data.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] flex flex-col items-center justify-center text-white px-6">
        <div className="max-w-md w-full bg-[#13131a] p-10 rounded-[2.5rem] border border-[#22d3ee]/20 text-center shadow-[0_0_50px_rgba(34,211,238,0.1)]">
          <div className="w-20 h-20 bg-[#22d3ee]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-check text-4xl text-[#22d3ee]"></i>
          </div>
          <h1 className="font-['Bebas_Neue'] text-5xl tracking-widest mb-4">ORDER PLACED</h1>
          <p className="text-white/60 font-['Space_Mono'] text-sm mb-8">
            Your order <span className="text-[#22d3ee] font-bold">{orderName}</span> has been received. 
            Once we verify your payment (Transaction ID: {transactionId}), we will begin processing your research compounds.
          </p>
          <button 
            onClick={() => router.push("/")}
            className="w-full py-4 bg-[#6366f1] text-white font-['Bebas_Neue'] text-xl tracking-widest rounded-xl hover:bg-[#22d3ee] hover:text-[#0b0b0f] transition-all"
          >
            RETURN TO CATALOG
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex flex-col">
      <Navbar />
      
      {/* IMAGE PREVIEW MODAL - Dead centered relative to viewport */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[200] bg-[#0b0b0f]/95 backdrop-blur-2xl cursor-zoom-out"
          onClick={() => setPreviewImage(null)}
        >
          {/* Centered Image Container - 30% Smaller */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[63vw] h-[63vw] max-w-[60vh] max-h-[60vh] bg-white rounded-[1.5rem] p-4 md:p-6 shadow-[0_0_80px_rgba(34,211,238,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Anchored to card */}
            <button 
              className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center bg-[#ff0060] text-white rounded-full transition-all z-[220] cursor-pointer shadow-2xl border-2 border-white hover:scale-110 active:scale-95"
              onClick={() => setPreviewImage(null)}
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <div className="relative w-full h-full">
              <Image 
                src={previewImage} 
                alt="QR Preview" 
                fill 
                className="object-contain" 
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow pt-40 pb-16 px-4 md:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 md:gap-12">
          
          {/* LEFT: FORM & PAYMENT */}
          <div className="space-y-8">
            <div className="bg-[#13131a] p-8 rounded-[2rem] border border-white/5 shadow-2xl">
              <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest mb-6 flex items-center gap-3">
                <i className="fa-solid fa-truck-fast text-[#6366f1]"></i>
                SHIPPING DETAILS
              </h2>
              
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-white/40 uppercase font-['Space_Mono'] block mb-1">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#6366f1] transition-all" />
                  </div>
                  <div className="relative">
                    <label className="text-[10px] text-white/40 uppercase font-['Space_Mono'] block mb-1">Phone Number</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-white/40 font-['Space_Mono'] text-sm">+1</span>
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        required 
                        placeholder="(555) 000-0000"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#6366f1] transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-white/40 uppercase font-['Space_Mono'] block mb-1">First Name</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#6366f1] transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/40 uppercase font-['Space_Mono'] block mb-1">Last Name</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#6366f1] transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-white/40 uppercase font-['Space_Mono'] block mb-1">Address Line 1</label>
                  <input type="text" value={address1} onChange={e => setAddress1(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#6366f1] transition-all" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="text-[10px] text-white/40 uppercase font-['Space_Mono'] block mb-1">City</label>
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#6366f1] transition-all" />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] text-white/40 uppercase font-['Space_Mono'] block mb-1">State / PIN</label>
                    <input type="text" value={zip} onChange={e => setZip(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#6366f1] transition-all" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] text-white/40 uppercase font-['Space_Mono'] block mb-1">Country</label>
                    <select value="USA" disabled className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none opacity-60 transition-all appearance-none cursor-not-allowed">
                      <option value="USA">USA ONLY</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            {/* PAYMENT SECTION */}
            <div className="bg-[#13131a] p-8 rounded-[2rem] border border-[#22d3ee]/10 shadow-[0_0_30px_rgba(34,211,238,0.05)]">
              <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest mb-6 flex items-center gap-3">
                <i className="fa-solid fa-qrcode text-[#22d3ee]"></i>
                PAYMENT VIA QR
              </h2>
              <p className="text-white/50 text-xs font-['Space_Mono'] mb-8 uppercase tracking-widest leading-relaxed">
                Scan any QR below to pay the total amount. Click to <span className="text-[#22d3ee]">Preview</span>. After payment, enter your <span className="text-[#22d3ee]">Transaction ID</span> below.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div 
                  className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden flex flex-col cursor-pointer hover:border-[#00d632]/50 transition-all group"
                  onClick={() => setPreviewImage(assets.cash_app_qr)}
                >
                  {/* QR Slot - Flush like product image */}
                  <div className="w-full aspect-square bg-white flex items-center justify-center relative overflow-hidden">
                    <Image src={assets.cash_app_qr} alt="CashApp QR" fill className="object-contain p-2" />
                    <div className="absolute inset-0 bg-[#00d632]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fa-solid fa-expand text-3xl text-white"></i>
                    </div>
                  </div>
                  
                  {/* Logo Slot - Styled exactly like the QR image above */}
                  <div className="h-[70px] w-full bg-white flex items-center justify-center relative overflow-hidden border-t border-white/10">
                    <div className="relative w-full h-full p-2 drop-shadow-[0_0_10px_rgba(0,214,50,0.3)]">
                      <Image src={assets.cash_app_logo} alt="CashApp" fill className="object-contain" />
                    </div>
                  </div>
                </div>

                <div 
                  className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden flex flex-col cursor-pointer hover:border-[#008cff]/50 transition-all group"
                  onClick={() => setPreviewImage(assets.venmo_qr)}
                >
                  {/* QR Slot - Flush like product image */}
                  <div className="w-full aspect-square bg-white flex items-center justify-center relative overflow-hidden">
                    <Image src={assets.venmo_qr} alt="Venmo QR" fill className="object-contain p-2" />
                    <div className="absolute inset-0 bg-[#008cff]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fa-solid fa-expand text-3xl text-white"></i>
                    </div>
                  </div>
                  
                  {/* Logo Slot - Styled exactly like the QR image above */}
                  <div className="h-[70px] w-full bg-white flex items-center justify-center relative overflow-hidden border-t border-white/10">
                    <div className="relative w-full h-full p-2 drop-shadow-[0_0_10px_rgba(0,140,255,0.3)]">
                      <Image src={assets.venmo_logo} alt="Venmo" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-[#22d3ee] uppercase font-['Space_Mono'] block tracking-[0.2em]">Enter Transaction ID</label>
                <input 
                  type="text" 
                  value={transactionId} 
                  onChange={e => setTransactionId(e.target.value)} 
                  placeholder="TXN-987654321..."
                  className="w-full bg-[#22d3ee]/5 border border-[#22d3ee]/20 rounded-xl px-6 py-4 text-[#22d3ee] font-bold outline-none focus:border-[#22d3ee] transition-all placeholder:text-[#22d3ee]/20"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:sticky lg:top-40 h-fit space-y-8">
            <div className="bg-gradient-to-br from-[#13131a] to-[#0b0b0f] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <h2 className="font-['Bebas_Neue'] text-4xl tracking-widest mb-8 border-b border-white/5 pb-4">
                ORDER <span className="text-[#6366f1]">SUMMARY</span>
              </h2>

              <div className="space-y-3 mb-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {lineItems.map(item => (
                  <div key={item.id} className="flex items-stretch bg-white/5 rounded-xl border border-white/5 overflow-hidden h-24 mb-3 last:mb-0">
                    {/* Compact Image Section */}
                    <div className="w-20 bg-black/40 flex-shrink-0 flex items-center justify-center border-r border-white/5">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={80} 
                        height={96} 
                        className="object-cover h-full w-full" 
                        unoptimized={true} 
                      />
                    </div>

                    {/* Compact Content Section */}
                    <div className="flex-grow p-3 flex flex-col justify-between min-w-0">
                      <div>
                        <p className="font-['Bebas_Neue'] text-base tracking-wider text-[#e6e6eb] leading-tight m-0 line-clamp-1 uppercase">
                          {item.name}
                        </p>
                        <p className="text-[9px] text-white/40 font-['Space_Mono'] uppercase tracking-tighter mt-0.5">
                          {item.size} • QTY: <span className="text-[#6366f1]">{item.quantity}</span>
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <p className="text-lg font-['Bebas_Neue'] text-[#6366f1] tracking-widest m-0 leading-none">
                          {currency}{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/5 pt-4">
                <div className="flex justify-between text-white/40 font-['Space_Mono'] text-[10px] uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>{currency}{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/40 font-['Space_Mono'] text-[10px] uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-[#22d3ee]">FREE</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="font-['Bebas_Neue'] text-xl tracking-widest text-white/70">TOTAL</span>
                  <span className="font-['Bebas_Neue'] text-4xl tracking-widest text-[#6366f1]">{currency}{cartTotal.toFixed(2)}</span>
                </div>
              </div>


              <button 
                form="checkout-form"
                disabled={loading || lineItems.length === 0}
                className="w-full mt-10 py-5 bg-[#6366f1] text-white font-['Bebas_Neue'] text-2xl tracking-widest rounded-2xl hover:bg-[#ff0060] transition-all transform hover:scale-[1.02] shadow-[0_20px_40px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      PLACE ORDER
                      <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
                    </>
                  )}
                </div>
              </button>
              
              <p className="text-center text-[10px] text-white/30 font-['Space_Mono'] mt-6 uppercase tracking-widest">
                Protected by secure research protocol
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}

