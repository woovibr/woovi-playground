import { GraphQLObjectType } from 'graphql';

import { messageSubscriptions } from '../modules/message/subscriptions/messageSubscriptions';

export const SubscriptionType = new GraphQLObjectType({
	name: 'Subscription',
	fields: () => ({
		...messageSubscriptions,
	}),
});
