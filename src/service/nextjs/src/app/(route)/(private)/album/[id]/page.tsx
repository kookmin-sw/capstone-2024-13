'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Diary } from '@/app/_type';
import AlbumPageDiary from './diary';
import AlbumContext from '@/app/_context/album';
import postFindDiaries from '@/app/_service/postFindDiary';
import HeaderContext from '@/app/_context/header';

const AlbumPage = (props: { params: { id: string } }) => {
	const { id } = props.params;
	const { albums } = useContext(AlbumContext);
	const album = albums.find(album => album._id.toString() === id);
	const router = useRouter();
	const { setTitle, setComponent } = useContext(HeaderContext);
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);

	useEffect(() => {
		if (!album) {
			router.push('/');
		} else {
			if (!isInitialized) {
				setIsInitialized(true);
				setTitle(album.title);
				setComponent(null);
				postFindDiaries({ albumId: id })
					.then((response: Diary[]) => {
						setDiaries(response);
					})
					.catch((error: Error) => {
						console.error(error);
					});
			}
		}
	}, [id, router, album, isInitialized, setTitle, setComponent]);

	return (
		<>
			{diaries.map((diary, index) => (
				<AlbumPageDiary key={index} {...diary} />
			))}
		</>
	);
};

export default AlbumPage;
