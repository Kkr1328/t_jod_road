'use client';
import { useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Box, Toolbar } from '@mui/material';

import Header from '../common/Header';
import AuthLayout from '../AuthLayout';
import { AuthContext } from '@/context/auth-context';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const authContext = useContext(AuthContext);

	const withoutHeader =
		usePathname() === '/login' ||
		usePathname() === '/register' ||
		usePathname() === '/resetPassword';

	if (!authContext.isUserAuthenticated() && !withoutHeader) router.push('/login');

	return (
		<Box className="w-screen h-screen flex bg-dark_background_grey">
			{!withoutHeader ? (
				<>
					<Header />
					<Box className="grow px-32 py-32">
						<Toolbar />
						{children}
					</Box>
				</>
			) : (
				<>
					<AuthLayout>{children}</AuthLayout>
				</>
			)}
		</Box>
	);
}
