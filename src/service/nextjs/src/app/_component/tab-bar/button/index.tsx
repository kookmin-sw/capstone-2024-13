'use client';

import { ReactNode } from 'react';
import style from '../../../_style/component/tab-bar/button/index.module.css';
import { usePathname, useRouter } from 'next/navigation';

const TabBarButton = (props: { url: string; icon: ReactNode }) => {
	const { url, icon } = props;
	const pathname = '/' + usePathname().split('/')[1];
	const router = useRouter();

	return (
		<div
			className={pathname === url ? style.active : style.inactive}
			onClick={() => router.push(url)}
		>
			{icon}
		</div>
	);
};

export default TabBarButton;
