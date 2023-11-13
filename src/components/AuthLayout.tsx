import { Grid, Box, Stack, Paper, Typography } from '@mui/material';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://source.unsplash.com/1600x900/?parking)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: 'rgba(255, 255, 255, 0.75)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<Grid
						container
						alignItems="center"
						paddingLeft="5%"
						sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '100%' }}
					>
						<Typography
							variant="h1"
							align="center"
							sx={{
								typography: { sm: 'h2' },
							}}
						>
							<p className="font-serif italic text-white font-medium">T-jod-Road</p>
						</Typography>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							height: '80vh',
						}}
					>
						<Stack spacing={2}>{children}</Stack>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}
