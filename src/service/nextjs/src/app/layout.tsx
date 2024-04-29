import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './font.css';
import './globals.css';
import ContextProviders from '@/context';
import Device from '@/component/device';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '아니근데오늘진짜',
	description: 'AI에게 말하는 오늘 하루 일기',
	applicationName: '아니근데오늘진짜',
	manifest: '/manifest.webmanifest',
	keywords: ['아니근데오늘진짜', 'AI', '일기', '대화', '대화형일기'],
	icons: [
		{ url: '/image/icon-192.png', sizes: '192x192', type: 'image/png' },
		{ url: '/image/icon-512.png', sizes: '512x512', type: 'image/png' },
	],
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en">
			<head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="theme-color" content="#000000" />
				<link rel="preconnect" href="https://you-know-what.com" />
				<link rel="preconnect" href="https://you-know-what.com/album" />
				<link rel="preconnect" href="https://you-know-what.com/diary" />
				<link rel="preconnect" href="https://you-know-what.com/search" />
				<link rel="preconnect" href="https://you-know-what.com/mypage" />
				<link rel="icon-192" href="/image/icon-192.png" />
				<link rel="icon-512" href="/image/icon-512.png" />
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
