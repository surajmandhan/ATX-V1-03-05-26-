async function shopifyFetch({ query, variables }) {
  try {
    const result = await fetch("/api/shopify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const responseBody = await result.json();
    
    if (responseBody.errors) {
      console.error("Shopify API Errors:", responseBody.errors);
    }

    return {
      status: result.status,
      body: responseBody,
    };
  } catch (error) {
    console.error("Fetch error via Proxy:", error);
    return {
      status: 500,
      error: "Error fetching from Proxy API",
    };
  }
}

export async function getAllProducts() {
  const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            category: productType
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  
  if (!response.body || !response.body.data || !response.body.data.products) {
    return [];
  }

  return response.body.data.products.edges.map((edge) => {
    const p = edge.node;
    const allVariants = p.variants.edges.map(v => ({
        id: v.node.id,
        title: v.node.title,
        price: parseFloat(v.node.price?.amount || "0"),
        displayPrice: `$${v.node.price?.amount || "0"}`
    }));
    
    const firstVariant = allVariants[0];
    return {
        _id: p.id,
        variantId: firstVariant?.id,
        variants: allVariants,
        name: p.title,
        handle: p.handle,
        description: p.description,
        image: p.images.edges.map(img => img.node.url),
        price: firstVariant?.price || 0,
        displayPrice: firstVariant?.displayPrice || "$0",
        category: p.category || "Peptide",
        size: firstVariant?.title !== "Default Title" ? firstVariant?.title : null
    };
  });
}

export async function getProduct(handle) {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        productType
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
        images(first: 5) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { handle } });
  const p = response.body.data?.productByHandle;
  
  if (!p) return null;

  const allVariants = p.variants.edges.map(v => ({
      id: v.node.id,
      title: v.node.title,
      price: parseFloat(v.node.price?.amount || "0"),
      displayPrice: `$${v.node.price?.amount || "0"}`
  }));
  
  const firstVariant = allVariants[0];

  return {
      _id: p.id,
      variantId: firstVariant?.id,
      variants: allVariants,
      name: p.title,
      handle: p.handle,
      description: p.description,
      image: p.images.edges.map(img => img.node.url),
      price: firstVariant?.price || 0,
      displayPrice: firstVariant?.displayPrice || "$0",
      category: p.productType || "Peptide",
      size: firstVariant?.title !== "Default Title" ? firstVariant?.title : null
  };
}


export async function createCheckout(lineItems, customerAccessToken = null) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
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
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: parseInt(item.quantity)
      })),
      buyerIdentity: customerAccessToken ? { customerAccessToken } : undefined
    }
  };

  const response = await shopifyFetch({ query, variables });
  const data = response.body.data?.cartCreate;

  if (data?.cart) {
    return {
      checkout: {
        webUrl: data.cart.checkoutUrl
      }
    };
  }

  return {
    checkoutUserErrors: data?.userErrors || [{ message: "Cart creation failed" }]
  };
}

export async function customerAccessTokenCreate(email, password) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = { input: { email, password } };
  const response = await shopifyFetch({ query, variables });
  return response.body.data?.customerAccessTokenCreate || { customerUserErrors: [{ message: "Login failed" }] };
}

export async function customerCreate(email, password, firstName, lastName) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          firstName
          lastName
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = { input: { firstName, lastName, email, password } };
  const response = await shopifyFetch({ query, variables });
  return response.body.data?.customerCreate || { customerUserErrors: [{ message: "Signup failed" }] };
}

export async function customerUpdate(customerAccessToken, customerInput) {
  const query = `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
          firstName
          lastName
          email
          phone
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = { customerAccessToken, customer: customerInput };
  const response = await shopifyFetch({ query, variables });
  return response.body.data?.customerUpdate || { customerUserErrors: [{ message: "Update failed" }] };
}

export async function getCustomer(customerAccessToken) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        wishlist: metafield(namespace: "custom", key: "wishlist") {
          value
        }
        addresses(first: 10) {
          edges {
            node {
              id
              address1
              address2
              city
              province
              zip
              country
              company
              firstName
              lastName
              phone
            }
          }
        }
        defaultAddress {
          id
        }
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { customerAccessToken } });
  const customer = response.body.data?.customer;
  if (!customer) return null;

  return {
    ...customer,
    wishlist: customer.wishlist?.value ? JSON.parse(customer.wishlist.value) : [],
    addresses: customer.addresses.edges.map(edge => edge.node)
  };
}

export async function customerAddressCreate(customerAccessToken, address) {
  const query = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
          id
          address1
          address2
          city
          province
          country
          zip
          company
          firstName
          lastName
          phone
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = { customerAccessToken, address };
  const response = await shopifyFetch({ query, variables });
  return response.body.data?.customerAddressCreate || { customerUserErrors: [{ message: "Address creation failed" }] };
}

export async function customerAddressUpdate(customerAccessToken, id, address) {
  const query = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress { id }
        customerUserErrors { code field message }
      }
    }
  `;

  const variables = { customerAccessToken, id, address };
  const response = await shopifyFetch({ query, variables });
  return response.body.data?.customerAddressUpdate || { customerUserErrors: [{ message: "Address update failed" }] };
}

export async function customerDefaultAddressUpdate(customerAccessToken, addressId) {
  const query = `
    mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
      customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
        customer { id }
        customerUserErrors { code field message }
      }
    }
  `;

  const variables = { customerAccessToken, addressId };
  const response = await shopifyFetch({ query, variables });
  return response.body.data?.customerDefaultAddressUpdate || { customerUserErrors: [{ message: "Default update failed" }] };
}

export async function getCustomerOrders(customerAccessToken) {
  const query = `
    query getCustomerOrders($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: 20, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              statusUrl
              totalPrice { amount }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      title
                      image { url }
                      price { amount }
                    }
                  }
                }
              }
              successfulFulfillments(first: 1) {
                trackingCompany
                trackingInfo(first: 1) {
                  number
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { customerAccessToken } });
  
  if (!response.body?.data?.customer) return [];

  const orders = response.body.data.customer.orders.edges.map(edge => {
    const o = edge.node;
    const tracking = o.successfulFulfillments?.[0];
    
    // Stable Status Logic
    let displayStatus = 'Processing';
    if (o.fulfillmentStatus === 'FULFILLED') {
      displayStatus = 'Shipped';
    } else if (o.fulfillmentStatus === 'PARTIALLY_FULFILLED') {
      displayStatus = 'Partially Shipped';
    } else if (o.financialStatus === 'REFUNDED') {
      displayStatus = 'Refunded';
    }

    return {
      _id: `#${o.orderNumber}`,
      date: o.processedAt,
      amount: o.totalPrice.amount,
      subtotal: o.totalPrice.amount,
      shipping: "0.00",
      tax: "0.00",
      discount: "0.00",
      refunded: "0.00",
      status: displayStatus,
      statusUrl: o.statusUrl,
      trackingCompany: tracking?.trackingCompany,
      trackingNumber: tracking?.trackingInfo?.[0]?.number,
      trackingUrl: tracking?.trackingInfo?.[0]?.url,
      items: o.lineItems.edges.map(itemEdge => {
        const item = itemEdge.node;
        return {
          name: item.title,
          quantity: item.quantity,
          size: item.variant?.title !== "Default Title" ? item.variant?.title : "",
          price: parseFloat(item.variant?.price?.amount || "0"),
          image: item.variant?.image?.url
        };
      })
    };
  });

  return orders;
}
