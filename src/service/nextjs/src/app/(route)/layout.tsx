import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './font.css';
import './globals.css';
import ContextProviders from '@/app/_context';
import Device from '@/app/_component/device';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '아니 근데 오늘 진짜',
	description: 'AI에게 말하는 오늘 하루 일기',
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en">
			<head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<link rel="icon-192" href="/icon-192.png" />
				<link rel="icon-440" href="/icon-440.png" />
				<link rel="manifest" href="/manifest.webmanifest" />
			</head>
			<body className={inter.className}>
				<ContextProviders>
					<Device>{children}</Device>
				</ContextProviders>
			</body>
		</html>
	);
}
