const redis = require('redis');

// Redis client create karna
const redisClient = redis.createClient({
  url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('❌ Redis Client Error', err));
redisClient.on('connect', () => console.log('✅ Redis Connected Successfully'));

// Client ko connect karna zaroori hai
redisClient.connect();

module.exports = redisClient;