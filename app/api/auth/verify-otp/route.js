import { NextResponse } from 'next/server';
import { getOtp, deleteOtp } from '@/lib/otp-utils';
import { SignJWT } from 'jose';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    const storedOtp = getOtp(email);

    if (!storedOtp || storedOtp !== otp) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // OTP is valid!
    deleteOtp(email);

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const adminToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    // 1. Search for customer in Shopify
    const searchUrl = `https://${cleanDomain}/admin/api/2024-04/customers/search.json?query=email:${email}`;
    const searchResponse = await fetch(searchUrl, {
      headers: { 'X-Shopify-Access-Token': adminToken }
    });
    const searchData = await searchResponse.json();

    let customer = searchData.customers?.[0];

    // 2. Create customer if not found (Signup)
    if (!customer) {
      const createUrl = `https://${cleanDomain}/admin/api/2024-04/customers.json`;
      const createResponse = await fetch(createUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': adminToken
        },
        body: JSON.stringify({
          customer: {
            first_name: "Research",
            last_name: "User",
            email: email,
            verified_email: true
          }
        })
      });
      const createData = await createResponse.json();
      customer = createData.customer;
    }

    if (!customer) {
      return NextResponse.json({ error: "Failed to sync customer with Shopify" }, { status: 500 });
    }

    // 3. Generate our own JWT Session Token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
    const token = await new SignJWT({ 
        customerId: customer.id, 
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret);

    // 4. Set Cookie and Return
    const response = NextResponse.json({ 
      success: true, 
      user: {
        id: customer.id,
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name
      },
      token // Also returning token for AppContext
    });

    response.cookies.set('atx_session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    return response;

  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
