import fs from 'fs/promises';
import { printSchema } from 'graphql/utilities';
import path from 'path';
import { promisify } from 'util';

import { schema } from '../src/schema/schema';

(async () => {
	await fs.writeFile(
		path.join(__dirname, '../schema/schema.graphql'),
		printSchema(schema)
	);

	process.exit(0);
})();
