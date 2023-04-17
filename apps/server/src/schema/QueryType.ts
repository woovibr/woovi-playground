import { GraphQLObjectType } from 'graphql';

import { messageConnectionField } from '../modules/message/messageFields';

export const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		...messageConnectionField('messages'),
	}),
});
