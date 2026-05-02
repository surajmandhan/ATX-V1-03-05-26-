'use client';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { placeholder } from '@/assets/assets';

const MiniCart = ({ isOpen, onClose }) => {
    const { cartItems, products, updateCartQuantity, getCartAmount, router, currency, processCheckout } = useAppContext();

    const handleCheckout = () => {
        onClose();
        router.push('/cart');
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
                                    <div key={itemId} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                                        <div className="w-[70px] h-[70px] relative rounded-xl overflow-hidden bg-[#13131a] border border-white/10 flex-shrink-0 flex items-center justify-center">
                                            <Image 
                                                src={product.image?.[0] || placeholder} 
                                                alt={product.name} 
                                                width={70} 
                                                height={70} 
                                                className="object-cover h-full w-full" 
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-['Bebas_Neue'] text-xl tracking-wider text-[#e6e6eb] leading-tight m-0">{product.name}</p>
                                            <p className="text-xs text-[#22d3ee] font-['Space_Mono'] mt-1">{displaySize} &nbsp;•&nbsp; {currency}{displayPrice ? displayPrice.replace('$', '') : ''}</p>
                                            
                                            <div className="flex items-center mt-3">
                                                <div className="flex items-center border border-white/20 rounded-full px-1 py-0.5 bg-black/30">
                                                    <button onClick={() => updateCartQuantity(itemId, quantity - 1)} className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer">-</button>
                                                    <span className="px-2 text-xs font-bold text-white w-8 text-center">{quantity}</span>
                                                    <button onClick={() => updateCartQuantity(itemId, quantity + 1)} className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer">+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => updateCartQuantity(itemId, 0)} 
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/40 hover:bg-[#ff0060] hover:text-white transition-all mr-1 cursor-pointer"
                                            title="Remove Item"
                                        >
                                            <i className="fa-solid fa-trash-can text-xs"></i>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-6 border-t border-white/10 bg-[#0b0b0f]">
                            <div className="flex justify-between items-end mb-6">
                                <span className="text-white/60 font-['Space_Mono'] text-sm uppercase tracking-widest">Subtotal</span>
                                <span className="text-3xl font-['Bebas_Neue'] text-[#22d3ee] tracking-widest">{currency}{getCartAmount().toFixed(2)}</span>
                            </div>
                            <button 
                                onClick={handleCheckout} 
                                className="w-full font-['Bebas_Neue'] text-xl tracking-widest py-4 px-8 rounded-full bg-[#6366f1] text-white hover:bg-[#ff0060] transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(255,0,96,0.6)] cursor-pointer"
                            >
                                Proceed to Checkout
                            </button>
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