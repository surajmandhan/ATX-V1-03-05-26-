const authSeller = async (userId) => {
  try {
    // For now, allow any authenticated user to be a seller for testing
    // In production, you would verify the role from your database or Shopify
    if (userId) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default authSeller;
