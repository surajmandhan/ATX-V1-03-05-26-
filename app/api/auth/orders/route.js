import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request) {
  try {
    const token = request.cookies.get('atx_session_token')?.value || 
                  request.headers.get('Authorization')?.split(' ')[1];

    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
    const { payload } = await jwtVerify(token, secret);

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const adminToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    const numericalId = payload.customerId.toString().split('/').pop();
    
    // Fetch orders from Admin API
    const ordersUrl = `https://${cleanDomain}/admin/api/2024-04/customers/${numericalId}/orders.json?status=any`;
    const response = await fetch(ordersUrl, {
      headers: { 'X-Shopify-Access-Token': adminToken }
    });
    
    const data = await response.json();
    
    // Transform to match existing UI structure
    const orders = data.orders.map(o => ({
      _id: `#${o.order_number}`,
      date: o.processed_at,
      amount: o.total_price,
      status: o.fulfillment_status === 'fulfilled' ? 'Shipped' : 'Processing',
      items: o.line_items.map(item => ({
        name: item.title,
        quantity: item.quantity,
        price: parseFloat(item.price),
        size: item.variant_title || ""
      }))
    }));

    return NextResponse.json(orders);

  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
