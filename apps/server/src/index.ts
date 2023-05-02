import http from 'http';

import { app } from './server/app';
import { config } from './config';
import { connectDatabase } from './database';
import { wsServer } from './server/wsServer';

(async () => {
	await connectDatabase();

	const server = http.createServer(app.callback());

	await wsServer(server);

	server.listen(config.PORT, () => {
		// eslint-disable-next-line
		console.log(`Server running on port:${config.PORT}`);
	});
})();
