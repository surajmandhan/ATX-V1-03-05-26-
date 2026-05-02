import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { placeholder as defaultImage } from "@/assets/assets";

export async function GET(request) {
  try {
    // const { data: products, error } = await supabase
    //   .from('products')
    //   .select('*')
    //   .order('created_at', { ascending: false });

    // if (error) {
    //   console.error('Supabase error:', error);
    //   // If table doesn't exist or other error, return empty array to prevent UI crash
    //   return NextResponse.json({ success: true, products: [] });
    // }

    // // Map Supabase fields to match the app's expectations
    // const formattedProducts = (products || []).map(p => {
    //   // Extract numeric price for calculations (e.g., "$50" -> 50)
    //   const numericPrice = Number(p.price?.replace(/[^0-9.]/g, '')) || 0;
      
    //   return {
    //     ...p,
    //     _id: p.id,
    //     offerPrice: numericPrice, // Use numeric price for app calculations
    //     price: numericPrice, // Keep numeric price for consistency
    //     displayPrice: p.price, // Keep original string for display
    //     fullDescription: p.full_description,
    //     // Ensure image is an array and has at least one valid URL
    //     image: (Array.isArray(p.image) ? p.image : [p.image]).filter(Boolean).length > 0 
    //       ? (Array.isArray(p.image) ? p.image : [p.image]).filter(Boolean)
    //       : [defaultImage]
    //   };
    // });

    // return NextResponse.json({ success: true, products: formattedProducts });
    return NextResponse.json({ success: true, products: [] });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
