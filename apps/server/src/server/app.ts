import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { graphqlHTTP } from 'koa-graphql';
import Router from 'koa-router';

import { ws } from './ws';
import { schema } from '../schema/schema';
import { getContext } from './getContext';

const app = new Koa();

app.use(
	bodyParser({
		onerror(err, ctx) {
			ctx.throw(err, 422);
		},
	})
);

const routes = new Router();

routes.all(
	'/graphql',
	graphqlHTTP(() => ({
		schema,
		graphiql: true,
		context: getContext(),
	}))
);

routes.all('/graphql/ws', ws);

app.use(routes.routes()).use(routes.allowedMethods());

export { app };
