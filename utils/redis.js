const Redis = require('ioredis');

export default class RedisClient {
  constructor() {
    this.client = new Redis();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
  }

  // Function isAlive
  isAlive() {
    return this.client.status === 'ready';
  }

  // async function get
  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  // async function set taking string key and duration in sec
  async set(key, value, duration) {
    await this.client.set(key, value);
    await this.client.expire(key, duration);
  }

  // async function del that takes string key and removes
  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
