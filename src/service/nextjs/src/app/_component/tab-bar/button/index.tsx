'use client';

import { MouseEvent, ReactNode } from 'react';
import style from '../../../_style/component/tab-bar/button/index.module.css';
import { usePathname, useRouter } from 'next/navigation';

const TabBarButton = (props: { url: string; icon: ReactNode }) => {
	const { url, icon } = props;
	const pathname = usePathname();
	const router = useRouter();

	return (
		<div
			className={pathname.includes(url) ? style.active : style.inactive}
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
