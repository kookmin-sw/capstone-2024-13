'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RouteToAlbum = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/album');
	}, [router]);

	return null;
};

export default RouteToAlbum;
