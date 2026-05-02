"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { placeholder } from "@/assets/assets";

export default function MyOrdersPage() {
  const { customerToken, currency, router } = useAppContext();
  // const { openSignIn } = useClerk(); // Removed Clerk
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customerToken) {
        setLoading(false);
        return;
      }
      try {
        const { getCustomerOrders } = await import("@/lib/shopify");
        const shopifyOrders = await getCustomerOrders(customerToken);
        setOrders(shopifyOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerToken]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0f] text-white">
      <Navbar />
      <main className="flex-grow pt-48 md:pt-56 mt-10 pb-20 px-6 max-w-[1000px] mx-auto w-full relative z-10">
        <div className="mb-12">
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#e6e6eb] mb-2 tracking-wide">
            MY <span className="text-[#6366f1]">ORDERS</span>
          </h1>
          <p className="text-white/50 font-['Space_Mono'] text-sm">
            View and track your research peptide orders.
          </p>
        </div>

        {!customerToken ? (
          <div className="text-center py-20 bg-[#13131a] rounded-3xl border border-white/10 shadow-2xl">
            <i className="fa-solid fa-lock text-6xl text-white/20 mb-6"></i>
            <h2 className="text-3xl font-['Bebas_Neue'] tracking-widest text-[#e6e6eb] mb-4">PLEASE LOGIN</h2>
            <p className="text-white/50 font-['Space_Mono'] text-sm mb-8">You must be logged in to view your orders.</p>
            <button onClick={() => router.push("/login")} className="font-['Bebas_Neue'] text-xl tracking-widest py-3 px-8 rounded-full bg-[#6366f1] text-white hover:bg-[#ff0060] transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(255,0,96,0.6)] cursor-pointer">
              Login Now
            </button>
          </div>
        ) : loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <i className="fa-solid fa-circle-notch fa-spin text-4xl text-[#6366f1] mb-4"></i>
            <p className="font-['Space_Mono'] text-white/50 text-sm">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-[#13131a] rounded-3xl border border-white/10 shadow-2xl">
            <i className="fa-solid fa-box-open text-6xl text-white/20 mb-6"></i>
            <h2 className="text-3xl font-['Bebas_Neue'] tracking-widest text-[#e6e6eb] mb-4">NO ORDERS YET</h2>
            <p className="text-white/50 font-['Space_Mono'] text-sm mb-8">You haven't placed any research orders yet.</p>
            <Link href="/all-products" className="font-['Bebas_Neue'] text-xl tracking-widest py-3 px-8 rounded-full bg-[#6366f1] text-white hover:bg-[#ff0060] transition-all inline-block shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(255,0,96,0.6)]">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div key={index} className="bg-[#13131a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden transition-all hover:border-[#6366f1]/50 group">
                
                {/* ORDER HEADER */}
                <div className="p-6 border-b border-white/10 flex flex-wrap justify-between items-center gap-6 bg-black/30">
                  <div>
                    <p className="text-white/40 font-['Space_Mono'] text-[10px] uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-[#22d3ee] font-bold font-['Space_Mono'] text-sm">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-white/40 font-['Space_Mono'] text-[10px] uppercase tracking-widest mb-1">Date</p>
                    <p className="text-white font-['Space_Mono'] text-sm">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-white/40 font-['Space_Mono'] text-[10px] uppercase tracking-widest mb-1">Total</p>
                    <p className="text-[#6366f1] font-['Bebas_Neue'] text-2xl tracking-widest leading-none">${parseFloat(order.amount).toFixed(2)}</p>
                  </div>
                  <div>
                    <span className={`px-4 py-1.5 rounded-full font-['Space_Mono'] text-xs font-bold tracking-widest uppercase border ${
                      order.status === 'Shipped' ? 'bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]' :
                      order.status === 'Processing' ? 'bg-[#eab308]/10 text-[#eab308] border-[#eab308]/30 shadow-[0_0_10px_rgba(234,179,8,0.2)] animate-pulse' :
                      order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                      order.status === 'Refunded' ? 'bg-white/10 text-white/50 border-white/20' :
                      'bg-white/5 text-white/30 border-white/10'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* ORDER ITEMS */ }
                <div className="p-6 space-y-5">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-xl bg-black/50 border border-white/5 overflow-hidden shrink-0 flex items-center justify-center p-2">
                        <Image src={(typeof item.image === 'string' ? item.image : item.image?.[0]) || item.product?.image?.[0] || placeholder} alt={item.name || item.product?.name} width={64} height={64} className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-['Bebas_Neue'] tracking-widest text-[#e6e6eb]">{item.name || item.product?.name}</h4>
                        <div className="text-xs text-white/50 font-['Space_Mono'] mt-1">Qty: {item.quantity} &nbsp;•&nbsp; {item.size}</div>
                      </div>
                      <div className="text-white font-bold font-['Space_Mono'] text-sm">
                        ${((item.price || 0) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ORDER FOOTER */ }
                <div className="px-6 py-4 border-t border-white/10 bg-black/20 flex justify-between items-center">
                   <div className="text-white/40 font-['Space_Mono'] text-[10px] uppercase tracking-widest">
                      {order.trackingNumber ? `${order.trackingCompany}: ${order.trackingNumber}` : 'Tracking info will appear when shipped'}
                   </div>
                   <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsSummaryOpen(true);
                        }}
                        className="font-['Bebas_Neue'] text-lg tracking-widest py-2 px-6 rounded-xl border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                      >
                         VIEW SUMMARY
                      </button>
                      {order.trackingNumber && order.status !== 'Delivered' && (
                        <button 
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsTrackingOpen(true);
                          }}
                          className="font-['Bebas_Neue'] text-lg tracking-widest py-2 px-6 rounded-xl bg-[#6366f1] text-white hover:bg-[#ff0060] transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] cursor-pointer"
                        >
                           TRACK ORDER
                        </button>
                      )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* TRACKING INFO MODAL - COMPACT SLIM STYLE */}
      {isTrackingOpen && selectedOrder && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsTrackingOpen(false)}></div>
          
          <div className="relative w-full max-w-sm bg-[#0d0d12] border border-white/10 rounded-[35px] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-300">
             <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h2 className="font-['Bebas_Neue'] text-xl tracking-widest text-[#e6e6eb]">TRACKING <span className="text-[#6366f1]">INFO</span></h2>
                <button onClick={() => setIsTrackingOpen(false)} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
             </div>

             <div className="p-6 space-y-6 text-center">
                <div className="w-16 h-16 bg-[#6366f1]/10 rounded-full flex items-center justify-center mx-auto border border-[#6366f1]/20">
                   <i className="fa-solid fa-truck-fast text-[#6366f1] text-2xl"></i>
                </div>

                <div className="space-y-1">
                   <p className="text-white/30 font-['Space_Mono'] text-[9px] uppercase tracking-widest">Carrier</p>
                   <h3 className="font-['Bebas_Neue'] text-2xl tracking-widest text-white leading-none">{selectedOrder.trackingCompany || 'Shipping Partner'}</h3>
                </div>

                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                   <p className="text-white/30 font-['Space_Mono'] text-[8px] uppercase tracking-widest">ID</p>
                   <p className="font-['Space_Mono'] text-sm text-[#22d3ee] font-bold break-all select-all tracking-tight">{selectedOrder.trackingNumber}</p>
                </div>

                {selectedOrder.trackingUrl ? (
                   <a 
                      href={selectedOrder.trackingUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#6366f1] text-white font-bold rounded-xl font-['Bebas_Neue'] tracking-widest text-lg hover:bg-[#ff0060] transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center gap-3 group"
                   >
                      TRACK PACKAGE <i className="fa-solid fa-arrow-up-right-from-square text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                   </a>
                ) : (
                   <div className="py-4 px-5 bg-white/5 text-white/30 font-['Space_Mono'] text-[9px] rounded-xl uppercase tracking-widest border border-dashed border-white/10 leading-relaxed">
                      Tracking link unavailable. Please track manually with the ID above.
                   </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* ORDER SUMMARY CENTERED MODAL - REFINED COMPACT STYLE */}
      {isSummaryOpen && selectedOrder && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsSummaryOpen(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-[#0d0d12] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col animate-in zoom-in duration-300">
             {/* HEADER */}
             <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div>
                   <div className="flex items-center gap-3">
                      <h2 className="font-['Bebas_Neue'] text-2xl tracking-widest text-[#e6e6eb]">ORDER <span className="text-[#6366f1]">DETAILS</span></h2>
                      <span className={`px-3 py-0.5 rounded-full font-['Space_Mono'] text-[8px] font-bold tracking-widest uppercase border ${
                        selectedOrder.status === 'Shipped' ? 'bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]' :
                        selectedOrder.status === 'Processing' ? 'bg-[#eab308]/10 text-[#eab308] border-[#eab308]/30 shadow-[0_0_10px_rgba(234,179,8,0.2)] animate-pulse' :
                        selectedOrder.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                        selectedOrder.status === 'Refunded' ? 'bg-white/10 text-white/50 border-white/20' :
                        'bg-white/5 text-white/30 border-white/10'
                      }`}>
                        {selectedOrder.status}
                      </span>
                   </div>
                   <p className="text-white/30 font-['Space_Mono'] text-[9px] uppercase tracking-widest mt-1">Order {selectedOrder._id} • {new Date(selectedOrder.date).toLocaleDateString()}</p>
                </div>
                <button onClick={() => setIsSummaryOpen(false)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
             </div>
             
             <div className="flex-grow overflow-y-auto p-8 md:p-10 custom-scrollbar max-h-[70vh]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   
                   {/* LEFT: PAYMENT SUMMARY */}
                   <div className="space-y-8">
                      <div className="space-y-6">
                         <h3 className="font-['Bebas_Neue'] text-xl tracking-widest text-white/80 border-b border-white/5 pb-2">PAYMENT</h3>
                         <div className="space-y-3">
                            <div className="flex justify-between font-['Space_Mono'] text-xs text-white/40 uppercase tracking-widest">
                               <span>Subtotal</span>
                               <span className="text-white font-bold">${parseFloat(selectedOrder.subtotal).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-['Space_Mono'] text-xs text-white/40 uppercase tracking-widest">
                               <span>Shipping</span>
                               <span className="text-white font-bold">${parseFloat(selectedOrder.shipping).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-['Space_Mono'] text-xs text-white/40 uppercase tracking-widest">
                               <span>Tax</span>
                               <span className="text-white font-bold">${parseFloat(selectedOrder.tax).toFixed(2)}</span>
                            </div>
                            <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                               <span className="font-['Bebas_Neue'] text-xl tracking-widest text-[#e6e6eb]">TOTAL</span>
                               <span className="font-['Bebas_Neue'] text-3xl tracking-widest text-[#6366f1]">${parseFloat(selectedOrder.amount).toFixed(2)}</span>
                            </div>
                         </div>
                      </div>

                      <a 
                         href={selectedOrder.statusUrl} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group mt-10"
                      >
                         <div className="flex items-center gap-4">
                            <i className="fa-solid fa-file-invoice text-[#ff0060] text-lg"></i>
                            <span className="font-['Bebas_Neue'] text-lg text-white tracking-widest uppercase">View Invoice</span>
                         </div>
                         <i className="fa-solid fa-chevron-right text-white/20 group-hover:text-white transition-all"></i>
                      </a>
                   </div>

                   {/* RIGHT: ITEMS & TRACKING */}
                   <div className="space-y-8">
                      {/* TRACKING SECTION */}
                      {selectedOrder.trackingNumber && (
                        <div className="p-5 bg-white/5 rounded-3xl border border-white/10 space-y-3">
                           <h3 className="font-['Bebas_Neue'] text-lg tracking-widest text-[#22d3ee]">TRACKING INFO</h3>
                           <div className="flex flex-col gap-1">
                              <span className="font-['Space_Mono'] text-[10px] text-white/40 uppercase tracking-widest">{selectedOrder.trackingCompany}</span>
                              <span className="font-['Space_Mono'] text-sm text-white font-bold">{selectedOrder.trackingNumber}</span>
                           </div>
                           {selectedOrder.trackingUrl && (
                             <a href={selectedOrder.trackingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#6366f1] hover:text-white font-['Bebas_Neue'] text-lg tracking-widest transition-all mt-2">
                                TRACK SHIPMENT <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                             </a>
                           )}
                        </div>
                      )}

                      <div className="space-y-6">
                         <h3 className="font-['Bebas_Neue'] text-xl tracking-widest text-white/80 border-b border-white/5 pb-2">ITEMS</h3>
                         <div className="space-y-4">
                            {selectedOrder.items?.map((item, i) => (
                              <div key={i} className="flex gap-4 items-center">
                                 <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/5 overflow-hidden shrink-0 flex items-center justify-center p-2">
                                    <Image src={item.image || placeholder} alt={item.name} width={48} height={48} className="object-contain h-full w-full" />
                                 </div>
                                 <div className="flex-grow">
                                    <h4 className="text-xs font-['Bebas_Neue'] tracking-widest text-white/90 leading-tight line-clamp-1">{item.name}</h4>
                                    <div className="text-[9px] text-white/30 font-['Space_Mono'] mt-0.5 uppercase">Size: {item.size || 'STD'} &nbsp;•&nbsp; Qty: {item.quantity}</div>
                                 </div>
                                 <div className="text-[#6366f1] font-bold font-['Space_Mono'] text-[10px]">${(item.price * item.quantity).toFixed(2)}</div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>

                </div>
             </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>

      <Footer />
    </div>
  );
}