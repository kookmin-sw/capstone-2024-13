'use client';

import { ReactNode, createContext, useCallback, useState } from 'react';

const TabBarVisibilityContext = createContext<{
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
	handleScroll: (currentScrollTop: number) => void;
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
		(currentScrollTop: number) => {
			setIsVisible(!currentScrollTop || currentScrollTop < lastScrollTop);
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
