import { supabase } from "@/lib/supabase";

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization"); const userId = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    const { data: addresses, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      return NextResponse.json({ success: false, message: error.message });
    }

    const formattedAddresses = addresses.map(addr => ({
      ...addr,
      _id: addr.id,
      fullName: addr.full_name,
      phoneNumber: addr.phone_number
    }));

    return NextResponse.json({ success: true, addresses: formattedAddresses });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
