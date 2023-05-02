import { Send } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { useMutation } from 'react-relay';
import { useState } from 'react';

import { MessageAdd } from './MessageAddMutation';
import { MessageAddMutation } from '../__generated__/MessageAddMutation.graphql';

type MessageListProps = {
	children?: React.ReactNode;
};

export const MessageList = ({ children }: MessageListProps) => {
	const [content, setContent] = useState('');
	const [messageAdd, isPending] = useMutation<MessageAddMutation>(MessageAdd);

	const handleSubmit = (e) => {
		e.preventDefault();

		messageAdd({
			variables: {
				input: {
					content,
				},
			},
		});

		setContent('');
	};

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
			<form onSubmit={handleSubmit}>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<TextField
						label="Message"
						variant="outlined"
						size="small"
						sx={{ width: '100%' }}
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<IconButton
						type="submit"
						disabled={isPending}
						sx={{
							color: '#FFFFFF',
							backgroundColor: '#03d69d',
							borderRadius: 0.5,
						}}
					>
						<Send />
					</IconButton>
				</Box>
			</form>
		</Box>
	);
};
