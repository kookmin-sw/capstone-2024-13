'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginCallbackPage = () => {
	const router = useRouter();

	useEffect(() => {
		if (navigator.serviceWorker) {
			navigator.serviceWorker
				.register('/sw.js')
				.then((registration: ServiceWorkerRegistration) => {
					console.log('Service Worker registration successful with scope:', registration.scope);
				})
				.catch((error: Error) => {
					console.error('Service Worker registration failed:', error);
				});
		}

		router.push('/album');
	}, [router]);

	return null;
};

export default LoginCallbackPage;
