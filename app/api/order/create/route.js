import { supabase } from "@/lib/supabase";

import { NextResponse } from "next/server";
import { productsData } from "@/assets/productData";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization"); const userId = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    const enhancedItems = items.map(item => {
      const [baseId, size] = item.product.split('---');
      const product = productsData.find(p => p._id === baseId);
      
      let numericPrice = 0;
      let name = "Unknown Product";
      let image = "";

      if (product) {
        name = product.name;
        image = product.image[0];
        const variant = size ? product.variants.find(v => v.size === size) : product.variants[0];
        numericPrice = variant ? variant.price : 0;
      }
      
      return {
        ...item,
        name,
        image,
        size: size || (product?.variants[0]?.size || ""),
        price: numericPrice
      };
    });

    const amount = enhancedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const finalAmount = amount + Math.floor(amount * 0.02);

    // Write order directly to Supabase to avoid Inngest 401 error if keys are missing
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        items: enhancedItems,
        amount: finalAmount,
        address_id: address,
        status: 'Order Placed'
      });

    if (orderError) {
      return NextResponse.json({ success: false, message: orderError.message });
    }

    // Clear user cart after order creation in Supabase
    await supabase
      .from('users')
      .update({ cart_items: {} })
      .eq('id', userId);

    return NextResponse.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
