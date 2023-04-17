import { Observable, RequestParameters, Variables } from 'relay-runtime';
import { createClient } from 'graphql-ws';

const IS_SERVER = typeof window === typeof undefined;

const SUBSCRIPTIONS_ENPOINT = process.env
	.NEXT_PUBLIC_SUBSCRIPTIONS_ENDPOINT as string;

const subscriptionsClient = IS_SERVER
	? null
	: createClient({
			url: SUBSCRIPTIONS_ENPOINT,
	  });

// both fetch and subscribe can be handled through one implementation
// to understand why we return Observable<any>, please see: https://github.com/enisdenjo/graphql-ws/issues/316#issuecomment-1047605774
function subscribe(
	operation: RequestParameters,
	variables: Variables
): Observable<any> {
	return Observable.create((sink) => {
		if (!subscriptionsClient) return;
		if (!operation.text) {
			return sink.error(new Error('Operation text cannot be empty'));
		}
		return subscriptionsClient.subscribe(
			{
				operationName: operation.name,
				query: operation.text,
				variables,
			},
			sink
		);
	});
}

export { subscribe };
