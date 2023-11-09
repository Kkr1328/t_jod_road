'use client';

import Image from 'next/image';

import { AppBar, Avatar, Toolbar } from '@mui/material';

export default function Header() {
	return (
		<AppBar className="z-20 fixed bg-black">
			<Toolbar>
				<Image src="/logo.svg" alt="5G-V2X logo" width={160} height={40} />
				<div className="grow" />
				<Avatar>K</Avatar>
			</Toolbar>
		</AppBar>
	);
}
