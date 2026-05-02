import { supabase } from "@/lib/supabase";

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization"); const userId = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    const { data: user, error } = await supabase
      .from('users')
      .select('cart_items')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return NextResponse.json({ success: false, message: "User Not Found" });
    }

    return NextResponse.json({ success: true, cartItems: user.cart_items || {} });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
