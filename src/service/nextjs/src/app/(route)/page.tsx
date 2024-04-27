'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
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
				})
				.finally(() => {
					router.push('/album');
				});
		}
	}, [router]);

	return null;
}
