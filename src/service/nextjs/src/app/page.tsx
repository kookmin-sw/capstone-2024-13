'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		if (navigator.serviceWorker && !navigator.serviceWorker.controller) {
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
					return;
				});
		} else {
			router.push('/album');
			return;
		}
	}, [router]);

	return null;
}
