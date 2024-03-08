'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Me } from '@/app/_type/me.type';
import { getFetcher } from '@/app/_service/api';

const AuthContext = createContext<{
	me: Me | null;
	setMe: Dispatch<SetStateAction<Me | null>>;
}>({
	me: null,
	setMe: () => {},
});

export const AuthProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [me, setMe] = useState<Me | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const router = useRouter();
	const pathname = usePathname();
	const isAuthPage = pathname.startsWith('/auth');

	useEffect(() => {
		if (!me) {
			getFetcher('/user/me')
				.then((response: any) => {
					setMe(response);
				})
				.catch(error => {
					setMe(null);
					if (!isAuthPage) {
						router.push('/auth/login');
					}
				})
				.finally(() => {
					setIsLoaded(true);
				});
		}
	}, [me, router, isAuthPage]);

	return (
		<AuthContext.Provider value={{ me, setMe }}>
			{isLoaded && (me || isAuthPage) && children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
