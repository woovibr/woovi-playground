import { GetServerSideProps } from 'next';

import { Message } from '../components/Message';
import { Layout } from '../components/Layout';
import { MessageList } from '../components/MessageList';
import { getPreloadedQuery } from '../relay/network';
import { PreloadedQuery, graphql, usePreloadedQuery } from 'react-relay';
import pageQuery, {
	pages_PageQuery,
} from '../__generated__/pages_PageQuery.graphql';
import { useMessageAddedSubscription } from '../components/subscriptions/useMessageAddedSubscription';

const IndexQuery = graphql`
	query pages_PageQuery($first: Int!, $after: String) {
		messages(first: $first, after: $after) @connection(key: "pages_messages") {
			__id
			edges {
				node {
					id
					...Message_message
				}
			}
		}
	}
`;

type IndexProps = {
	queryRefs: {
		pageQueryRef: PreloadedQuery<pages_PageQuery>;
	};
};

const Index = ({ queryRefs }: IndexProps) => {
	const data = usePreloadedQuery<pages_PageQuery>(
		IndexQuery,
		queryRefs.pageQueryRef
	);

	useMessageAddedSubscription({
		connections: [data.messages?.__id],
		input: {},
	});

	return (
		<Layout>
			<MessageList>
				{data.messages.edges.map(({ node }) => (
					<Message key={node.id} message={node} />
				))}
			</MessageList>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			preloadedQueries: {
				pageQueryRef: await getPreloadedQuery(pageQuery, {
					first: 1,
					after: null,
				}),
			},
		},
	};
};

export default Index;
