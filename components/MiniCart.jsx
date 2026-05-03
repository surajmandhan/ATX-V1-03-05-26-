'use client';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { placeholder } from '@/assets/assets';

const MiniCart = ({ isOpen, onClose }) => {
    const { cartItems, products, updateCartQuantity, getCartAmount, router, currency, processCheckout } = useAppContext();

    const handleCheckout = () => {
        onClose();
        router.push('/checkout-custom');
    };


    const cartProductIds = Object.keys(cartItems);

    return (
        <div
            className={`fixed inset-0 z-[999999] transition-opacity duration-300 ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80"
                onClick={onClose}
            />

            {/* Sliding Cart Panel */}
            <div
                className={`absolute right-0 top-0 h-full w-full sm:max-w-md bg-[#0b0b0f] border-l border-white/10 shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h2 className="text-3xl font-['Bebas_Neue'] tracking-widest text-[#e6e6eb] m-0">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-[#22d3ee] transition-colors text-4xl leading-none font-light cursor-pointer"
                    >
                        &times;
                    </button>
                </div>

                {cartProductIds.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                        <i className="fa-solid fa-cart-arrow-down text-5xl text-white/20 mb-4"></i>
                        <p className="text-white/50 mb-6 font-['Space_Mono'] text-sm">Your cart is empty.</p>
                        <button
                            onClick={() => {
                                onClose();
                                router.push('/all-products');
                            }}
                            className="font-['Bebas_Neue'] text-xl tracking-widest py-3 px-8 rounded-full bg-[#6366f1] text-white hover:bg-[#22d3ee] hover:text-[#0b0b0f] transition-all transform hover:scale-105 cursor-pointer"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            {cartProductIds.map(itemId => {
                                const [baseId, size] = itemId.split('---');
                                const product = products.find(p => p._id === baseId);
                                if (!product) return null;
                                const quantity = cartItems[itemId];
                                const variant = size ? product.variants?.find(v => v.size === size) : product.variants?.[0];
                                const displayPrice = variant ? variant.displayPrice : product.displayPrice;
                                const displaySize = variant ? variant.size : product.size;
                                return (
                                    <div key={itemId} className="flex items-stretch bg-white/5 rounded-2xl border border-white/5 overflow-hidden h-32 flex-shrink-0">
                                        {/* Image Section */}
                                        <div className="w-28 bg-black/40 flex-shrink-0 flex items-center justify-center border-r border-white/5">
                                            <Image 
                                                src={product.image?.[0] || placeholder} 
                                                alt={product.name} 
                                                width={112} 
                                                height={112} 
                                                className="object-cover h-full w-full" 
                                            />
                                        </div>

                                        {/* Info Section - Balanced vertical distribution */}
                                        <div className="flex-grow p-4 flex flex-col justify-between min-w-0">
                                            <div>
                                                <p className="font-['Bebas_Neue'] text-lg tracking-wider text-[#e6e6eb] leading-[1.1] m-0 line-clamp-2 uppercase">
                                                    {product.name}
                                                </p>
                                                <p className="text-[10px] text-white/40 font-['Space_Mono'] uppercase tracking-tighter mt-1">
                                                    Variant: <span className="text-[#22d3ee]">{displaySize}</span>
                                                </p>
                                            </div>
                                            <p className="text-xl font-['Bebas_Neue'] text-[#6366f1] tracking-widest m-0 leading-none">
                                                {currency}{displayPrice ? displayPrice.replace('$', '') : ''}
                                            </p>
                                        </div>




                                        {/* Actions Section (Strict fixed split) */}
                                        <div className="w-28 border-l border-white/5 flex flex-col h-full flex-shrink-0">
                                            <button 
                                                onClick={() => updateCartQuantity(itemId, 0)} 
                                                className="h-16 w-full flex items-center justify-center text-white/20 hover:bg-[#ff0060]/10 hover:text-[#ff0060] transition-all border-b border-white/5 cursor-pointer"
                                                title="Remove Item"
                                            >
                                                <i className="fa-solid fa-trash-can text-sm"></i>
                                            </button>
                                            
                                            <div className="h-16 w-full flex items-center justify-center px-2 bg-black/20">
                                                <div className="flex items-center w-full justify-between gap-1">
                                                    <button onClick={() => updateCartQuantity(itemId, quantity - 1)} className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer text-sm">−</button>
                                                    <span className="text-xs font-bold text-[#6366f1] font-['Space_Mono']">{quantity}</span>
                                                    <button onClick={() => updateCartQuantity(itemId, quantity + 1)} className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer text-sm">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





                                );
                            })}
                        </div>

                        <div className="p-6 border-t border-white/10 bg-[#0b0b0f]">
                            <div className="flex justify-between items-end mb-6">
                                <span className="text-white/60 font-['Space_Mono'] text-sm uppercase tracking-widest">Subtotal</span>
                                <span className="text-3xl font-['Bebas_Neue'] text-[#22d3ee] tracking-widest">{currency}{getCartAmount().toFixed(2)}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => { onClose(); router.push('/cart'); }} 
                                    className="w-full font-['Bebas_Neue'] text-lg tracking-widest py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    VIEW CART
                                </button>
                                <button 
                                    onClick={handleCheckout} 
                                    className="w-full font-['Bebas_Neue'] text-lg tracking-widest py-3 px-4 rounded-xl bg-[#6366f1] text-white hover:bg-[#ff0060] transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer"
                                >
                                    CHECKOUT
                                </button>
                            </div>

                        </div>
                    </>
                )}
                
                <style>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                  }
                `}</style>
            </div>
        </div>
    );
};

export default MiniCart;