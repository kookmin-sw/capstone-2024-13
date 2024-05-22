'use client';

import { useContext, useEffect } from 'react';
import AlbumContext from '@/context/album';
import Album from '@/container/(private)/album/album';
import CreateAlbumButton from '@/container/(private)/album/create-album-button';
import Header from '@/component/header';
import style from '@/style/app/(private)/album/index.module.css';

const AlbumPage = () => {
	const { albums } = useContext(AlbumContext);

	useEffect(() => {
		if (navigator.serviceWorker && !navigator.serviceWorker.controller) {
			navigator.serviceWorker
				.register('/sw.js')
				.then((registration: ServiceWorkerRegistration) => {
					console.log('Service Worker registration successful with scope:', registration.scope);
				})
				.catch((error: Error) => {
					console.error('Service Worker registration failed:', error);
				});
		}
	}, []);

	return (
		<div className={style.container}>
			<Header title={'앨범'} component={<CreateAlbumButton />} />
			<div>
				{albums.map((album, index) => (
					<Album key={index} album={album} />
				))}
			</div>
		</div>
	);
};

export default AlbumPage;
