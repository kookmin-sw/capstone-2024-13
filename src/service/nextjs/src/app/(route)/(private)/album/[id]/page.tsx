'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Diary } from '@/app/_type';
import { postFindDiary } from '@/app/_service';
import AlbumPageDiary from './diary';
import AlbumContext from '@/app/_context/album';
import Header from '@/app/_component/header';
import style from '../../../../_style/(route)/(private)/album/[id]/index.module.css';

const AlbumPage = (props: { params: { id: string } }) => {
	const { id } = props.params;
	const { albums } = useContext(AlbumContext);
	const album = albums.find(album => album._id.toString() === id);
	const router = useRouter();
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);

	useEffect(() => {
		if (!album) {
			router.push('/');
		} else {
			if (!isInitialized) {
				setIsInitialized(true);
				postFindDiary({ albumId: { $in: [id] } })
					.then((response: Diary[]) => {
						setDiaries(response);
					})
					.catch((error: Error) => {
						console.error(error);
					});
			}
		}
	}, [id, router, album, isInitialized]);

	return (
		<>
			{album && <Header title={album.title} />}
			<div className={style.container}>
				{diaries.map((diary, index) => (
					<AlbumPageDiary key={index} {...diary} />
				))}
			</div>
		</>
	);
};

export default AlbumPage;
