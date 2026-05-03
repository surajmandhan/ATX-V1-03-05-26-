import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request) {
  try {
    const token = request.cookies.get('atx_session_token')?.value || 
                  request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
    const { payload } = await jwtVerify(token, secret);

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const adminToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    // Fetch fresh customer data from Shopify Admin
    // The payload.customerId is usually like "gid://shopify/Customer/12345" or just "12345"
    const numericalId = payload.customerId.toString().split('/').pop();
    
    const customerUrl = `https://${cleanDomain}/admin/api/2024-04/customers/${numericalId}.json`;
    const response = await fetch(customerUrl, {
      headers: { 'X-Shopify-Access-Token': adminToken }
    });
    
    if (!response.ok) {
        return NextResponse.json({ error: "Failed to fetch Shopify data" }, { status: response.status });
    }

    const data = await response.json();
    const customer = data.customer;

    return NextResponse.json({
      success: true,
      user: {
        id: customer.id,
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name,
        phone: customer.phone,
        addresses: customer.addresses,
        defaultAddress: customer.default_address
      }
    });

  } catch (error) {
    console.error("Auth Me Error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
