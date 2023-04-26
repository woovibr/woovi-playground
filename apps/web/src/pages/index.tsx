import { Message } from '../components/Message';
import { Layout } from '../components/Layout';
import { MessageList } from '../components/MessageList';

export default function Web() {
	return (
		<Layout>
			<MessageList>
				<Message />
			</MessageList>
		</Layout>
	);
}
