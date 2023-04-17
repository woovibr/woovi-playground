import { GraphQLString } from 'graphql';

export const errorField = (key: string) => ({
	[key]: {
		type: GraphQLString,
		resolve: async (obj: Record<string, unknown>) => obj.error,
	},
});
