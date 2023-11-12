'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import { AppBar, Avatar, Toolbar, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { AuthContext } from '@/context/auth-context';

export default function Header() {
	const router = useRouter();
	const authContext = useContext(AuthContext);
	const { logout } = authContext;

	const handleProfile = () => {
		router.push('/profile');
	};

	const handleLogout = () => {
		logout();
		router.push('/login');
	};
	return (
		<AppBar className="z-20 fixed bg-black">
			<Toolbar>
				<div style={{ flex: 1 }}>
					<Typography>T-jod-Road</Typography>
				</div>
				<div className="grow" />
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
