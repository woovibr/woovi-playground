import { GetServerSideProps } from 'next';

import { Message } from '../components/Message';
import { Layout } from '../components/Layout';
import { MessageList } from '../components/MessageList';
import { getPreloadedQuery } from '../relay/network';
import { PreloadedQuery, graphql, usePreloadedQuery } from 'react-relay';
import pageQuery, { pages_PageQuery } from '../__generated__/pages_PageQuery.graphql';

const IndexQuery = graphql`
  query pages_PageQuery {
    messages {
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
}

const Index = ({ queryRefs }: IndexProps) => {
	const data = usePreloadedQuery<pages_PageQuery>(IndexQuery, queryRefs.pageQueryRef);
	
	return (
		<Layout>
			<MessageList>
				{data.messages.edges.map(({ node }) => (
					<Message key={node.id} message={node} />
				))}
			</MessageList>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      preloadedQueries: {
        pageQueryRef: await getPreloadedQuery(
          pageQuery,
          {},
        ),
      },
    },
  };
};


export default Index;