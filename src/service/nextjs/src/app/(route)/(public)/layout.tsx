'use client';

import AuthContext from '@/app/_context/auth';
import { useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect } from 'react';

export default function PublicLayout(props: { children: ReactNode }) {
	const { children } = props;
	const { me } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (me) {
			router.push('/');
		}
	}, [me, router]);

	return <> {!me && children} </>;
}
