import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';

import { Message } from './MessageModel';

const { Wrapper, getLoader, clearCache, load, loadAll } = createLoader({
	model: Message,
	loaderName: 'MessageLoader',
});

registerLoader('MessageLoader', getLoader);

export const MessageLoader = {
	Message: Wrapper,
	getLoader,
	clearCache,
	load,
	loadAll,
};
