import { Box } from '@mui/material';
import { Logo } from '@woovi-playground/ui';

export const WooviAvatar = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				height: '40px',
				borderRadius: '100%',
				backgroundColor: '#03D69D',
				aspectRatio: '3/3',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Logo height={36} width={36} />
		</Box>
	);
};
