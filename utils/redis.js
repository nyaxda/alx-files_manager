const Redis = require('ioredis');
/**
 * Redis client
 */
class RedisClient {
  /**
   * Constructor for RedisClient
   */
  constructor() {
    this.client = new Redis();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
  }

  /**
   * Check if client is connected
   * @returns {boolean} true if client is connected
   */
  isAlive() {
    return this.client.status === 'ready';
  }

  /**
   * Get value from key
   * @param {String} key
   * @returns {String} value
   */
  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  /**
   * Set key value pair with duration
   * @param {String} key
   * @param {String} value
   * @param {Number} duration
   */
  async set(key, value, duration) {
    await this.client.set(key, value);
    await this.client.expire(key, duration);
  }

  /**
   * Delete key from redis
   * @param {String} key
   */
  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
