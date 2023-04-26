import { Box, Card, Typography } from '@mui/material';
import { WooviAvatar } from './WooviAvatar';

type MessageProps = {};

export const Message = (props: MessageProps) => {
	return (
		<Card
			variant="outlined"
			sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}
		>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<WooviAvatar />
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography fontWeight={500}>Woovi Playground</Typography>
					<Typography variant="body2">Date</Typography>
				</Box>
			</Box>
			<Typography variant="body2">Message</Typography>
		</Card>
	);
};
