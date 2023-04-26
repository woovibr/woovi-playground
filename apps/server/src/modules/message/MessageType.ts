import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';
import type { ConnectionArguments } from 'graphql-relay';

import { IMessage } from './MessageModel';
import { nodeInterface } from '../node/typeRegister';
import { registerTypeLoader } from '../node/typeRegister';
import { MessageLoader } from './MessageLoader';

const MessageType = new GraphQLObjectType<IMessage>({
	name: 'Message',
	description: 'Represents a message',
	fields: () => ({
		id: globalIdField('Message'),
		content: {
			type: GraphQLString,
			resolve: (message) => message.content,
		},
		createdAt: {
			type: GraphQLString,
			resolve: (message) => message.createdAt.toISOString(),
		},
	}),
	interfaces: () => [nodeInterface],
});

const MessageConnection = connectionDefinitions({
	name: 'Message',
	nodeType: MessageType,
});

registerTypeLoader(MessageType, MessageLoader.load);

export { MessageType, MessageConnection };
