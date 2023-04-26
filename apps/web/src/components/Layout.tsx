import { Container } from '@mui/material';

type LayoutProps = {
	children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<Container
			maxWidth="sm"
			sx={{
				backgroundColor: 'white',
				p: 2,
				height: '100vh',
				overflowY: 'scroll',
			}}
		>
			{children}
		</Container>
	);
};
