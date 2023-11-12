import { useRouter } from 'next/navigation';

import { AppBar, Toolbar, Typography, Avatar, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

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
		<AppBar position="static">
			<Toolbar>
				<div style={{ flex: 1 }}>
					<Typography><Link href={"/drive_in"}>T-jod-Road</Link></Typography>
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
