'use client';

import { ReactNode, createContext, useCallback, useState } from 'react';

const TabBarVisibilityContext = createContext<{
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
	handleScroll: (currentScrollTop: number, scrollHeight?: number, clientHeight?: number) => void;
}>({
	isVisible: true,
	setIsVisible: () => {},
	handleScroll: () => {},
});

export const TabBarVisibilityProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [lastScrollTop, setLastScrollTop] = useState<number>(0);
	const [isVisible, setIsVisible] = useState<boolean>(true);

	const handleScroll = useCallback(
		(currentScrollTop: number, scrollHeight?: number, clientHeight?: number) => {
			const threshold = 10;
			console.log('currentScrollTop', currentScrollTop);
			console.log('scrollHeight', scrollHeight);
			console.log('clientHeight', clientHeight);

			if (currentScrollTop <= threshold) {
				setIsVisible(true);
			} else if (
				scrollHeight &&
				clientHeight &&
				scrollHeight < currentScrollTop + clientHeight + threshold
			) {
				setIsVisible(false);
			} else {
				setIsVisible(currentScrollTop < lastScrollTop);
			}
			setLastScrollTop(currentScrollTop);
		},
		[lastScrollTop],
	);

	return (
		<TabBarVisibilityContext.Provider value={{ isVisible, setIsVisible, handleScroll }}>
			{children}
		</TabBarVisibilityContext.Provider>
	);
};

export default TabBarVisibilityContext;
