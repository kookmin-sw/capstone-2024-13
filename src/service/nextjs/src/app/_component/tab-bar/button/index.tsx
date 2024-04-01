'use client';

import { ReactNode } from 'react';
import style from '../../../_style/component/tab-bar/button/index.module.css';
import { usePathname, useRouter } from 'next/navigation';

const IsActive = (url: string, pathname: string) => {
	if (pathname.includes('album')) {
		return url === '/';
	}
	if (url === '/') {
		return pathname === '/';
	}
	return pathname.includes(url);
};

const TabBarButton = (props: { url: string; icon: ReactNode }) => {
	const { url, icon } = props;
	const pathname = usePathname();
	const router = useRouter();

	return (
		<div
			className={IsActive(url, pathname) ? style.active : style.inactive}
			onClick={() => router.push(url)}
		>
			{icon}
		</div>
	);
};

export default TabBarButton;
