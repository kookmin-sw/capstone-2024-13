'use client';

import { MouseEvent, ReactNode, useContext, useEffect } from 'react';
import TabBarVisibilityContext from '@/context/tab-bar-visibility';
import TabBar from '@/component/tab-bar';
import style from '@/style/app/(private)/layout.module.css';

export default function PrivateLayout(props: { children: ReactNode }) {
	const { children } = props;
	const { isVisible, setIsVisible, handleClick } = useContext(TabBarVisibilityContext);

	useEffect(() => {
		window.onbeforeunload = () => {
			window.scrollTo(0, 0);
			setIsVisible(true);
		};
		return () => {
			window.onbeforeunload = null;
		};
	}, [setIsVisible]);

	return (
		<div
			className={style.container}
			onClick={(event: MouseEvent<HTMLDivElement>) => {
				event.preventDefault();
				event.stopPropagation();
				handleClick();
			}}
		>
			{children}
			<TabBar isVisible={isVisible} />
		</div>
	);
}
