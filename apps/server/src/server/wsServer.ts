import { Server as WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from '../schema/schema';
import { execute, parse, subscribe, validate } from 'graphql';
import { getContext } from './getContext';

export const wsServer = (app: unknown) => {
	const server = new WebSocketServer({
		noServer: true,
	});

	useServer(
		{
			schema,
			execute,
			subscribe,
			context: async () => getContext(),
			onConnect: () => {
				//eslint-disable-next-line
				console.log('Connected to Websocket');

				return;
			},
			onSubscribe: async (_, message) => {
				const { operationName, query, variables } = message.payload;

				const document = typeof query === 'string' ? parse(query) : query;

				const args = {
					schema,
					contextValue: getContext(),
					operationName,
					document,
					variableValues: variables,
				};

				const validationErrors = validate(args.schema, args.document);

				if (validationErrors.length > 0) {
					return validationErrors; // return `GraphQLError[]` to send `ErrorMessage` and stop Subscription
				}

				return args;
			},
		},
		server
	);

	app.on('upgrade', (req, socket, head) => {
		if (req.url === '/graphql/ws') {
			server.handleUpgrade(req, socket, head, (ws) => {
				server.emit('connection', ws, req);
			});
		}
	});
};
