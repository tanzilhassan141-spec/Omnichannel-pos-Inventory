const Product = require('../models/Product');
const redisClient = require('../config/redis');

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    // Cache Invalidation: Naya product add hone par purana cache delete karo 
    // Abhi simple approach ke liye hum saare cache keys clear kar rahe hain jinke naam me 'products_' hai
    const keys = await redisClient.keys('products_*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all products with Search, Cursor Pagination & Caching
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    // API Query params le rahe hain
    const { search, cursor, limit = 10 } = req.query;

    // Redis Cache Key generate karna parameters ke base par
    const cacheKey = `products_${search || 'all'}_${cursor || 'first'}_${limit}`;

    // 1. Check Redis Cache First 
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      // Agar data cache me mil gaya, toh directly return kar do (Super Fast Response)
      return res.json({ source: 'redis', data: JSON.parse(cachedData) });
    }

    // 2. Database Query Logic
    let query = {};

    // Advanced Text Search 
    if (search) {
      query.$text = { $search: search };
    }

    // Cursor-based Pagination logic 
    if (cursor) {
      query._id = { $gt: cursor }; // Pichle last item ke ID se aage ke items laao
    }

    // MongoDB se fetch karna
    const products = await Product.find(query)
      .limit(parseInt(limit))
      .sort({ _id: 1 }); // Sort ID ke hisab se karna zaroori hai cursor pagination ke liye

    // Next cursor (Last product ka ID) nikalna
    const nextCursor = products.length > 0 ? products[products.length - 1]._id : null;

    const responseData = {
      source: 'database',
      products,
      nextCursor
    };

    // 3. Data Redis me Save karna (1 ghante/3600s ke liye expire time set karke) 
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(responseData));

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct, getProducts };