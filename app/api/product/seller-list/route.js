import authSeller from "@/lib/authSeller";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization"); const userId = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('userId', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ success: true, products: [] });
    }

    const formattedProducts = (products || []).map(p => {
      const numericPrice = Number(p.price?.replace(/[^0-9.]/g, '')) || 0;
      return {
        ...p,
        _id: p.id,
        offerPrice: numericPrice,
        price: numericPrice,
        displayPrice: p.price,
        fullDescription: p.full_description,
        image: (Array.isArray(p.image) ? p.image : [p.image]).filter(Boolean).length > 0 
          ? (Array.isArray(p.image) ? p.image : [p.image]).filter(Boolean)
          : ["https://picsum.photos/seed/placeholder/800/800"]
      };
    });

    return NextResponse.json({ success: true, products: formattedProducts });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
