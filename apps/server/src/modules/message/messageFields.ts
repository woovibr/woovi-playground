import { MessageType, MessageConnection } from './MessageType';
import { MessageLoader } from './MessageLoader';

export const messageField = (key: string) => ({
	[key]: {
		type: MessageType,
		resolve: async (obj: Record<string, unknown>, _, context) =>
			MessageLoader.load(context, obj.message as string),
	},
});

export const messageConnectionField = (key: string) => ({
	[key]: {
		type: MessageConnection.connectionType,
		resolve: async (_, args, context) => {
			const hmm = await MessageLoader.loadAll(context, args);

			console.log({ hmm });

			return hmm;
		},
	},
});
