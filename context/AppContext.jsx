"use client";
import { getAllProducts, createCheckout } from "@/lib/shopify";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useWishlist } from "@/hooks/useWishlist";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [customerToken, setCustomerToken] = useState(null);
  const [cartItems, setCartItems] = useState({});
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // 1. Fetch Products from Shopify
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const shopifyProducts = await getAllProducts();
      setProducts(shopifyProducts);
    } catch (error) {
      console.error("Error fetching Shopify products:", error);
      toast.error("Failed to load products from Shopify");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Load data from LocalStorage & Cookies on mount
  useEffect(() => {
    // Auth Token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("shopifyCustomerToken="))
      ?.split("=")[1];

    if (token) {
      setCustomerToken(token);
    }

    // Persisted Cart
    const savedCart = localStorage.getItem("atx_cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (parsed && typeof parsed === 'object') {
          setCartItems(parsed);
        }
      } catch (e) {
        console.error("Error parsing cart:", e);
      }
    }
    setIsCartLoaded(true);
    fetchProducts();
  }, []);

  // Fetch Customer Data when token is available
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (customerToken) {
        try {
          const response = await fetch("/api/auth/me", {
            headers: { 'Authorization': `Bearer ${customerToken}` }
          });
          const data = await response.json();
          if (data.success) {
            setUserData(data.user);
          } else {
            setCustomerToken(null);
            document.cookie = "shopifyCustomerToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
        } catch (error) {
          console.error("Auth sync error:", error);
        }
      }
    };
    fetchCustomerData();
  }, [customerToken]);


  // 3. Save Cart to LocalStorage whenever it changes (only after initial load)
  useEffect(() => {
    if (!isCartLoaded) return;

    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("atx_cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("atx_cart");
    }
  }, [cartItems, isCartLoaded]);

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("atx_cart");
  };

  const addToCart = (itemId) => {
    setCartItems(prev => {
      const newData = { ...prev };
      newData[itemId] = (newData[itemId] || 0) + 1;
      return newData;
    });
    toast.success("Added to cart");
  };

  const updateCartQuantity = (itemId, quantity) => {
    setCartItems(prev => {
      const newData = { ...prev };
      if (quantity <= 0) {
        delete newData[itemId];
      } else {
        newData[itemId] = quantity;
      }
      return newData;
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + (Number(qty) || 0), 0);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        // Split if it's a variant ID (id---size)
        const [baseId] = itemId.split('---');
        const itemInfo = products.find((product) => product._id === baseId);
        
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const processCheckout = async () => {
    router.push("/checkout-custom");
  };


  const logout = () => {
    document.cookie = "shopifyCustomerToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setCustomerToken(null);
    setUserData(null);
    localStorage.removeItem("atx_cart");
    router.push("/");
    toast.success("Logged out successfully");
  };

  const { wishlist, toggleWishlist, isInWishlist, isSyncing: isWishlistSyncing } = useWishlist(userData, customerToken);

  const value = {
    currency,
    router,
    userData,
    setUserData,
    customerToken,
    setCustomerToken,
    products,
    isLoading,
    cartItems,
    setCartItems,
    clearCart,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    isMiniCartOpen,
    setIsMiniCartOpen,
    processCheckout,
    logout,
    wishlist,
    toggleWishlist,
    isInWishlist,
    isWishlistSyncing
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
