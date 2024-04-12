'use client';

import { ReactNode, useContext, useEffect } from 'react';
import Header from '@/app/_component/header';
import TabBar from '@/app/_component/tab-bar';
import style from '../../_style/(route)/(private)/layout.module.css';
import HeaderContext from '@/app/_context/header';
import TabBarVisibilityContext from '@/app/_context/tab-bar-visibility';

export default function PrivateLayout(props: { children: ReactNode }) {
	const { children } = props;
	const { title, component } = useContext(HeaderContext);
	const { isVisible, setIsVisible, handleScroll } = useContext(TabBarVisibilityContext);

	useEffect(() => {
		window.onbeforeunload = () => {
			window.scrollTo(0, 0);
			handleScroll(0);
			setIsVisible(true);
		};
		return () => {
			window.onbeforeunload = null;
		};
	}, [handleScroll, setIsVisible]);

	return (
		<div className={style.container}>
			<Header title={title} component={component} />
			<div
				onScroll={event => {
					const div = event.target as HTMLDivElement;

					handleScroll(div.scrollTop, div.scrollHeight);
				}}
			>
				{children}
			</div>
			<TabBar isVisible={isVisible} />
		</div>
	);
}
