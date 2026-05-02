import { supabase } from "@/lib/supabase";

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization"); const userId = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    let { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    // If user not found in Supabase, return not found for now
    if (error || !user) {
      return NextResponse.json({ success: false, message: "User Not Found" });
    }

    if (!user) {
      return NextResponse.json({ success: false, message: "User Not Found" });
    }

    // Map Supabase fields to match the app's expectations if necessary
    const formattedUser = {
      ...user,
      _id: user.id,
      imageUrl: user.image_url,
      cartItems: user.cart_items || {},
      wishlistItems: user.wishlist_items || []
    };

    return NextResponse.json({ success: true, user: formattedUser });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
