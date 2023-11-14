'use client';

import { Box, Toolbar } from '@mui/material';

import Header from '../common/Header';

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Box className="w-screen h-screen flex bg-dark_background_grey">
			<Box className="grow">
				{children}
			</Box>
		</Box>
	);
}
