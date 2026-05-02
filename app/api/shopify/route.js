import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { query, variables } = await request.json();
    
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    const isAdminToken = token.startsWith('shpat_');
    const endpoint = isAdminToken 
        ? `https://${cleanDomain}/admin/api/2024-04/graphql.json`
        : `https://${cleanDomain}/api/2024-01/graphql.json`;

    const headerName = isAdminToken 
        ? "X-Shopify-Access-Token" 
        : "X-Shopify-Storefront-Access-Token";

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [headerName]: token,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Proxy API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
