const redis = require('redis');
const bluebird = require('bluebird');
const { logger } = require('./logger');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

function getOjRedisAgent(connOptions) {
  const redisConf = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASS || undefined,
    database: parseInt(process.env.REDIS_DB, 10) || 0,
  };
  const redisClient = redis.createClient({
    ...redisConf,
    ...connOptions,
  });
  redisClient.on('error', function (err) {
    logger.error('[redis.error]', err);
  });

  return redisClient;
}

module.exports = {
  getOjRedisAgent,
};
