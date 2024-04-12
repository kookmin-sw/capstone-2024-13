'use client';

import { ReactNode, createContext, useState } from 'react';

const HeaderContext = createContext<{
	title: string;
	setTitle: (title: string) => void;
	component: ReactNode;
	setComponent: (component: ReactNode) => void;
}>({
	title: '',
	setTitle: () => {},
	component: null,
	setComponent: () => {},
});

export const HeaderProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [title, setTitle] = useState<string>('');
	const [component, setComponent] = useState<ReactNode>(null);

	return (
		<HeaderContext.Provider
			value={{
				title,
				setTitle,
				component,
				setComponent,
			}}
		>
			{children}
		</HeaderContext.Provider>
	);
};

export default HeaderContext;
