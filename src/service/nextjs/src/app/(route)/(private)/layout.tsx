'use client';

import { MouseEvent, ReactNode, useContext, useEffect } from 'react';
import TabBar from '@/app/_component/tab-bar';
import style from '../../_style/(route)/(private)/layout.module.css';
import TabBarVisibilityContext from '@/app/_context/tab-bar-visibility';

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
			<div>{children}</div>
			<TabBar isVisible={isVisible} />
		</div>
	);
}
