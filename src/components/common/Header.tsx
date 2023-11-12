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
		<AppBar className="z-20 fixed">
			<Toolbar>
				<Image src="/next.svg" alt="5G-V2X logo" width={160} height={40} />
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
