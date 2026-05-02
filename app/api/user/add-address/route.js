import { supabase } from "@/lib/supabase";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization"); const userId = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    const { address } = await request.json();

    const { data: newAddress, error } = await supabase
      .from('addresses')
      .insert({
        user_id: userId,
        full_name: address.fullName,
        phone_number: address.phoneNumber,
        pincode: address.pincode,
        area: address.area,
        city: address.city,
        state: address.state
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message });
    }

    return NextResponse.json({
      success: true,
      message: "Address added successfully",
      newAddress: {
        ...newAddress,
        _id: newAddress.id,
        fullName: newAddress.full_name,
        phoneNumber: newAddress.phone_number
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
