import './globals.css';
import type { Metadata } from 'next';
import { Istok_Web } from 'next/font/google';

import LayoutWrapper from '@/components/module/LayoutWrapper';

const istok_web = Istok_Web({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-istok-web',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<html lang="en" className={`${istok_web.variable} font-sans`}>
				<body id="__next" suppressHydrationWarning={true}>
					<LayoutWrapper>{children}</LayoutWrapper>
				</body>
			</html>
		</>
	);
}
