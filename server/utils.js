
// Generate a unique order ID
exports.generateOrderId = () => {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `ORD-${timestamp}-${random}`;
};

// Seed database with initial products
exports.seedProducts = async (Product) => {
  const products = [
    {
      name: "Wireless Bluetooth Headphones",
      description: "Experience premium sound quality with these comfortable over-ear headphones featuring active noise cancellation.",
      price: 149.99,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
      inventory: 15
    },
    {
      name: "Smart Watch Series 5",
      description: "Track your fitness, receive notifications, and more with this waterproof smartwatch featuring a high-resolution display.",
      price: 299.95,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0d2F0Y2h8ZW58MHx8MHx8fDA%3D",
      inventory: 8
    },
    // Add more products from your data/products.ts file
  ];

  try {
    await Product.deleteMany({}); // Clear existing products
    await Product.insertMany(products);
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};
