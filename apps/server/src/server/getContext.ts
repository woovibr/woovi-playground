import { getDataloaders } from '../modules/loader/loaderRegister';

const getContext = () => {
	const dataloaders = getDataloaders();

	return {
		dataloaders,
	} as const;
};

export { getContext };
