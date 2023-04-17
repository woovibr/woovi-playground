import { GraphQLObjectType, GraphQLTypeResolver } from 'graphql';
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

type Load = (context: unknown, id: string) => unknown;
type TypeLoaders = {
	[key: string]: {
		type: GraphQLObjectType;
		load: Load;
	};
};

const getTypeRegister = () => {
	const typesLoaders: TypeLoaders = {};

	const getTypesLoaders = () => typesLoaders;

	const registerTypeLoader = (type: GraphQLObjectType, load: Load) => {
		typesLoaders[type.name] = {
			type,
			load,
		};

		return type;
	};

	const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
		(globalId: string, context: unknown) => {
			const { type, id } = fromGlobalId(globalId);

			const { load } = typesLoaders[type] || { load: null };

			return (load && load(context, id)) || null;
		},
		(obj: GraphQLTypeResolver<unknown, unknown>) => {
			const { type } = typesLoaders[obj.constructor.name] || { type: null };

			return type.name;
		}
	);

	return {
		registerTypeLoader,
		getTypesLoaders,
		nodeField,
		nodesField,
		nodeInterface,
	};
};

const { registerTypeLoader, nodeInterface, nodeField, nodesField } =
	getTypeRegister();

export { registerTypeLoader, nodeInterface, nodeField, nodesField };
