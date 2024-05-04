'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Diary } from '@/type';
import { postFindDiary } from '@/service';
import AlbumContext from '@/context/album';
import Header from '@/component/header';
import AlbumPageDiary from '@/container/(private)/album/[albumId]/diary';
import style from '@/style/app/(private)/album/[albumId]/index.module.css';

const AlbumPage = (props: { params: { albumId: string } }) => {
	const { albumId } = props.params;
	const { albums } = useContext(AlbumContext);
	const album = albums.find(album => album._id.toString() === albumId);
	const router = useRouter();
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);

	useEffect(() => {
		if (!album) {
			router.push('/album');
			alert('잘못된 접근입니다.');
			return;
		} else {
			if (!isInitialized) {
				setIsInitialized(true);
				postFindDiary({ albumId: { $in: [albumId] } })
					.then((response: Diary[]) => {
						setDiaries(response);
					})
					.catch((error: Error) => {
						console.error(error);
					});
			}
		}
	}, [albumId, router, album, isInitialized]);

	return (
		<div className={style.container}>
			<Header title={album?.title} />
			<div>
				{diaries.map((diary, index) => (
					<AlbumPageDiary key={index} albumId={albumId} diary={diary} />
				))}
			</div>
		</div>
	);
};

export default AlbumPage;
