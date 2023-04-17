import { Card, Container, Typography } from '@mui/material';
import { Logo } from '@woovi-playground/ui';

export default function Web() {
	return (
		<Container
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Card
				variant="outlined"
				sx={{
					width: '300px',
					aspectRatio: '1/1',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Logo height={120} width={120} />
				<Typography>༼ つ ◕_◕ ༽つ Woovi Playground</Typography>
			</Card>
		</Container>
	);
}
