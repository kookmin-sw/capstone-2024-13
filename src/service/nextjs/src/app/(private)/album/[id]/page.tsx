'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Diary } from '@/type';
import { postFindDiary } from '@/service';
import AlbumContext from '@/context/album';
import Header from '@/component/header';
import AlbumPageDiary from '@/container/(private)/album/[id]/diary';
import style from '@/style/app/(private)/album/[id]/index.module.css';

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
		<div className={style.container}>
			{album && <Header title={album.title} />}
			<div>
				{diaries.map((diary, index) => (
					<AlbumPageDiary key={index} {...diary} />
				))}
			</div>
		</div>
	);
};

export default AlbumPage;
