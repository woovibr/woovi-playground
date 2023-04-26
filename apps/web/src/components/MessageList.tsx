import { Send } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';

type MessageListProps = {
	children?: React.ReactNode;
};

export const MessageList = ({ children }: MessageListProps) => {
	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				justifyContent: 'flex-end',
			}}
		>
			{children}
			<Box sx={{ display: 'flex', gap: 1 }}>
				<TextField
					label="Message"
					variant="outlined"
					size="small"
					sx={{ width: '100%' }}
				/>
				<IconButton
					sx={{
						color: '#FFFFFF',
						backgroundColor: '#03d69d',
						borderRadius: 0.5,
					}}
				>
					<Send />
				</IconButton>
			</Box>
		</Box>
	);
};
