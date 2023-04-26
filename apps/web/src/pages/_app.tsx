import React, { Suspense } from 'react';
import type { AppProps } from 'next/app';
import '../styles/index.css';

import { ReactRelayContainer } from '../relay/ReactRelayContainer';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Suspense fallback="loading">
			<ReactRelayContainer Component={Component} props={pageProps} />
		</Suspense>
	);
}
