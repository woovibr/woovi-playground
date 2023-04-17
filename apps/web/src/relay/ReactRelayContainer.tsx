import { Suspense, useMemo } from 'react';
import { createEnvironment } from './environment';
import { NextPageWithLayout, RelayHydrate } from './RelayHydrate';
import { ReactRelayContext } from 'react-relay';

export function ReactRelayContainer<T>({
	Component,
	props,
}: {
	Component: NextPageWithLayout<T>;
	props: any;
}) {
	const environment = useMemo(() => createEnvironment(), []);
	return (
		<ReactRelayContext.Provider value={{ environment }}>
			<Suspense fallback={null}>
				<RelayHydrate Component={Component} props={props} />
			</Suspense>
		</ReactRelayContext.Provider>
	);
}
