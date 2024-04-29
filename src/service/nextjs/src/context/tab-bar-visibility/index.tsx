'use client';

import { ReactNode, createContext, useCallback, useState } from 'react';

const TabBarVisibilityContext = createContext<{
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
	handleClick: () => void;
}>({
	isVisible: true,
	setIsVisible: () => {},
	handleClick: () => {},
});

export const TabBarVisibilityProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [isVisible, setIsVisible] = useState<boolean>(true);

	const handleClick = useCallback(() => {
		setIsVisible(prev => !prev);
	}, []);

	return (
		<TabBarVisibilityContext.Provider value={{ isVisible, setIsVisible, handleClick }}>
			{children}
		</TabBarVisibilityContext.Provider>
	);
};

export default TabBarVisibilityContext;
