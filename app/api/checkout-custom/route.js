import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { items, customer, address, transactionId } = await request.json();

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const adminToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

    if (!adminToken) {
      return NextResponse.json({ error: "Admin token not configured" }, { status: 500 });
    }

    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    // Switch to REST API as confirmed working by user
    const endpoint = `https://${cleanDomain}/admin/api/2024-04/orders.json`;

    // Prepare the order object in REST format
    const orderPayload = {
      order: {
        email: customer.email,
        phone: customer.phone,
        note: `Payment received via QR. Transaction ID: ${transactionId}`,
        financial_status: "paid",

        send_receipt: true,
        line_items: items.map(item => {
          // Extract numerical ID from GID if necessary (gid://shopify/ProductVariant/12345 -> 12345)
          const variantId = item.variantId.toString().split('/').pop();
          return {
            variant_id: parseInt(variantId),
            quantity: item.quantity
          };
        }),
        customer: {
          first_name: customer.firstName || address.firstName,
          last_name: customer.lastName || address.lastName,
          email: customer.email,
          phone: customer.phone
        },
        shipping_address: {
          first_name: address.firstName,
          last_name: address.lastName,
          address1: address.address1,
          address2: address.address2,
          city: address.city,
          province: address.province || "DL", // Defaulting as per user example if missing
          country: address.country || "India",
          zip: address.zip,
          phone: customer.phone
        },
        billing_address: {
          first_name: address.firstName,
          last_name: address.lastName,
          address1: address.address1,
          address2: address.address2,
          city: address.city,
          province: address.province || "DL",
          country: address.country || "India",
          zip: address.zip,
          phone: customer.phone
        }
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify(orderPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Shopify REST API Error:", result);
      return NextResponse.json({ 
        error: "Failed to create order via REST API", 
        details: result 
      }, { status: response.status });
    }

    return NextResponse.json({ 
      success: true, 
      order: result.order 
    });

  } catch (error) {
    console.error("Custom Checkout REST API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
