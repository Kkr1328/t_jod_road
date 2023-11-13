import { useRouter } from 'next/navigation';

import { AppBar, Toolbar, Typography, Avatar, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProfile } from '@/services/user';

export default function Navbar() {
	const router = useRouter();
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

	const handleProfile = () => {
		router.push('/profile');
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		router.push('/login');
	};

	useEffect(() => {
		getProfile()
			.then(e => e.id)
			.then(id => setIsAdmin(id === 1 ? true : false))
	},[])
	
	if (typeof window !== 'undefined' && localStorage.getItem('token') === null) { 
        router.push('/login')
    }
	return (
		<AppBar position="static">
			<Toolbar>
				<div style={{ flex: 1 }}>
					<Typography fontSize={32} fontWeight={"bold"}><Link href={isAdmin ? "/parking_space" : "/"}>T-jod-Road</Link></Typography>
				</div>
				<div className='flex gap-48 mr-48'>
					{ isAdmin !== null ?
							!isAdmin ?
								<>
									<li className='list-none'><Link href={"/"}>Drive In</Link></li>
									<li className='list-none'><Link href={"/review"}>Review</Link></li>
								</>
								:
								<>
									<li className='list-none'><Link href={"/parking_space"}>Parking</Link></li>
								</>
						:
						<></>	
					}
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
