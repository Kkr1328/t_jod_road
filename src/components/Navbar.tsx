import { useRouter } from 'next/navigation';

import { AppBar, Toolbar, Typography, Avatar, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
	const router = useRouter();

	const handleProfile = () => {
		router.push('/profile');
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		router.push('/login');
	};

	return (
		<AppBar position="fixed">
			<Toolbar>
				<div style={{ flex: 1 }}>
					<Typography>T-jod-Road</Typography>
				</div>
				<Button onClick={handleProfile}>
					<Avatar />
				</Button>
				<Button onClick={handleLogout}>
					<LogoutIcon sx={{ color: '#ffffff' }} />
				</Button>
			</Toolbar>
		</AppBar>
	);
}
