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

  // 1. Fetch Products from Shopify
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const shopifyProducts = await getAllProducts();
      console.log("Fetched Products:", shopifyProducts);
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
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        setCartItems({});
      }
    }

    fetchProducts();
  }, []);

  // Fetch Customer Data when token is available
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (customerToken) {
        const { getCustomer } = await import("@/lib/shopify");
        const data = await getCustomer(customerToken);
        if (data) {
          setUserData(data);
        } else {
          // Token might be invalid or expired
          setCustomerToken(null);
          document.cookie = "shopifyCustomerToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      }
    };
    fetchCustomerData();
  }, [customerToken]);

  // 3. Save Cart to LocalStorage whenever it changes
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("atx_cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
    if (Object.keys(cartData).length === 0) {
      localStorage.removeItem("atx_cart");
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
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
    if (getCartCount() === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const loadingToast = toast.loading("Preparing checkout...");
      
      const lineItems = Object.keys(cartItems)
        .filter(id => cartItems[id] > 0)
        .map(itemId => {
          const [baseId, variantTitle] = itemId.split('---');
          const product = products.find(p => p._id === baseId);
          
          // If we have a specific variant title, find that variant's ID
          let variantId = product?.variantId;
          if (variantTitle && product?.variants) {
            const specificVariant = product.variants.find(v => v.title === variantTitle);
            if (specificVariant) variantId = specificVariant.id;
          }

          return {
            variantId: variantId,
            quantity: cartItems[itemId]
          };
        })
        .filter(item => item.variantId); // Remove items without a valid variant ID

      const response = await createCheckout(lineItems, customerToken);

      if (response.checkout) {
        toast.dismiss(loadingToast);
        toast.success("Redirecting to secure checkout...");
        window.location.href = response.checkout.webUrl;
      } else {
        toast.dismiss(loadingToast);
        const error = response.checkoutUserErrors?.[0]?.message || "Checkout failed. Please check console for details.";
        toast.error(error);
        console.error("Shopify Checkout Errors:", response.checkoutUserErrors);
      }
    } catch (error) {
      toast.dismiss();
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout");
    }
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
