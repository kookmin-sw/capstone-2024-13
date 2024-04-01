import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './font.css';
import './globals.css';
import ContextProviders from '@/app/_context';
import Device from '@/app/_component/device';
import TabBar from '../_component/tab-bar';
import style from '../_style/(route)/layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '아니 근데 오늘 진짜',
	description: 'AI 대화형 일기 서비스',
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en">
			<body className={inter.className}>
				<ContextProviders>
					<Device>
						<div className={style.container}>
							<div>{children}</div>
							<TabBar />
						</div>
					</Device>
				</ContextProviders>
			</body>
		</html>
	);
}
