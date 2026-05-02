import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    let { customerId, wishlist } = await request.json();
    console.log("Wishlist Sync Request (Raw):", { customerId, wishlist });

    // Shopify Storefront API IDs are often Base64 encoded. 
    // Admin API needs the decoded GID (e.g., gid://shopify/Customer/12345)
    if (customerId && !customerId.startsWith('gid://')) {
      try {
        customerId = Buffer.from(customerId, 'base64').toString('utf-8').split('?')[0];
        console.log("Decoded Customer ID:", customerId);
      } catch (e) {
        console.error("Failed to decode Customer ID:", e);
      }
    }

    if (!customerId || !customerId.startsWith('gid://shopify/Customer/')) {
      return NextResponse.json({ error: "Invalid Customer ID format" }, { status: 400 });
    }

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const adminToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

    if (!adminToken) {
      console.warn("CRITICAL: SHOPIFY_ADMIN_API_ACCESS_TOKEN is missing in .env");
      return NextResponse.json({ error: "Admin API Token Missing. Please add SHOPIFY_ADMIN_API_ACCESS_TOKEN to .env" }, { status: 500 });
    }

    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const endpoint = `https://${cleanDomain}/admin/api/2024-04/graphql.json`;

    // GraphQL Mutation to update customer metafield
    const query = `
      mutation updateCustomerMetafield($input: CustomerInput!) {
        customerUpdate(input: $input) {
          customer {
            id
            metafield(namespace: "custom", key: "wishlist") {
              value
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        id: customerId,
        metafields: [
          {
            namespace: "custom",
            key: "wishlist",
            value: JSON.stringify(wishlist)
          }
        ]
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("Shopify GraphQL Errors:", data.errors);
      return NextResponse.json({ error: data.errors[0]?.message || "Shopify GraphQL Error" }, { status: 500 });
    }

    if (data.data?.customerUpdate?.userErrors?.length > 0) {
      const userError = data.data.customerUpdate.userErrors[0];
      console.error("Shopify User Errors:", data.data.customerUpdate.userErrors);
      return NextResponse.json({ error: `${userError.field}: ${userError.message}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, metafield: data.data.customerUpdate.customer.metafield });

  } catch (error) {
    console.error("Wishlist Sync Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
