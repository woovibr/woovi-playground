import { Server as WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from '../schema/schema';
import { GraphQLSchema, execute, parse, subscribe, validate } from 'graphql';
import { Server } from 'http';
import { parse as urlParse } from 'url';

type CreateGraphQLServerOptions = {
	schema: GraphQLSchema;
	context: (() => unknown) | Record<string, unknown>;
};

export const createGraphqlWs = (
	server: Server,
	path: string,
	options: CreateGraphQLServerOptions
) => {
	const wss = new WebSocketServer({
		noServer: true,
	});

	useServer(
		{
			schema: options.schema,
			execute,
			subscribe,
			context: async () => {
				if (typeof options.context === 'function') {
					return options.context();
				}

				return options.context;
			},
			onConnect: () => {
				//eslint-disable-next-line
				console.log(`Connected to ${path} Websocket`);

				return;
			},
			onSubscribe: async (_, message) => {
				const { operationName, query, variables } = message.payload;

				const document = typeof query === 'string' ? parse(query) : query;

				const args = {
					schema,
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
		wss
	);

	server.on('upgrade', function upgrade(request, socket, head) {
		const { pathname } = urlParse(request.url);

		if (pathname === path) {
			wss.handleUpgrade(request, socket, head, function done(ws) {
				wss.emit('connection', ws, request);
			});
		}
	});
};
