import { supabase } from "@/lib/supabase";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization"); const userId = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    const { cartData } = await request.json();

    const { error } = await supabase
      .from('users')
      .update({ cart_items: cartData })
      .eq('id', userId);

    if (error) {
      return NextResponse.json({ success: false, message: error.message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
