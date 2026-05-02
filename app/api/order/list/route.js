import { supabase } from "@/lib/supabase";

import { NextResponse } from "next/server";
import { productsData } from "@/assets/productData";
import { placeholder as defaultImage } from "@/assets/assets";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const userId = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        address:addresses(*)
      `)
      .eq('user_id', userId);

    if (error) {
      return NextResponse.json({ success: false, message: error.message });
    }

    const formattedOrders = orders.map(order => {
      const items = (order.items || []).map(item => {
        const [baseId, size] = item.product.split('---');
        const product = productsData.find(p => p._id === baseId);
        
        let numericPrice = 0;
        let displayName = 'Unknown Product';
        let productImage = [defaultImage];
        let displayPrice = '';
        
        if (product) {
          const variant = size ? product.variants.find(v => v.size === size) : product.variants[0];
          numericPrice = variant ? variant.price : 0;
          displayPrice = variant ? variant.displayPrice : '';
          productImage = product.image;
          displayName = variant ? `${product.name} (${variant.size})` : product.name;
        }
        
        return {
          ...item,
          product: {
            ...product,
            _id: item.product,
            name: displayName,
            price: numericPrice,
            offerPrice: numericPrice,
            displayPrice: displayPrice,
            image: productImage
          }
        };
      });

      return {
        ...order,
        _id: order.id,
        items,
        date: new Date(order.created_at).getTime()
      };
    });

    return NextResponse.json({ success: true, orders: formattedOrders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
