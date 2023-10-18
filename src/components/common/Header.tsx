'use client';

import { AppBar, Avatar, Toolbar } from '@mui/material';

export default function Header() {
	return (
		<AppBar className="z-20 fixed bg-black">
			<Toolbar>
				<div className="grow" />
				<Avatar>K</Avatar>
			</Toolbar>
		</AppBar>
	);
}
