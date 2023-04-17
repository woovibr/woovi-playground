import { RedisPubSub } from 'graphql-redis-subscriptions';

export const redisPubSub = new RedisPubSub({
	connection: process.env.REDIS_HOST,
});
