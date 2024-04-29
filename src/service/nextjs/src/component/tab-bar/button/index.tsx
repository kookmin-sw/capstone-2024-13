'use client';

import { MouseEvent, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import style from '@/style/component/tab-bar/button/index.module.css';

const TabBarButton = (props: { url: string; icon: ReactNode }) => {
	const { url, icon } = props;
	const pathname = usePathname();
	const router = useRouter();

	return (
		<div
			className={pathname.indexOf(url) === 0 ? style.active : style.inactive}
			onClick={(event: MouseEvent<HTMLDivElement>) => {
				event.preventDefault();
				event.stopPropagation();
				router.push(url);
			}}
		>
			{icon}
		</div>
	);
};

export default TabBarButton;
