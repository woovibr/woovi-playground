import { useMemo } from 'react';
import { useSubscription } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import {
	MessageAddedSubscription,
	MessageAddedSubscription$variables,
} from '../../__generated__/MessageAddedSubscription.graphql';
import { MessageAdded } from './MessageAddedSubscription';

const useMessageAddedSubscription = (
	variables: MessageAddedSubscription$variables
) => {
	const newMessageConfig = useMemo<
		GraphQLSubscriptionConfig<MessageAddedSubscription>
	>(
		() => ({
			subscription: MessageAdded,
			variables,
		}),
		[variables]
	);

	useSubscription(newMessageConfig);
};

export { useMessageAddedSubscription };
