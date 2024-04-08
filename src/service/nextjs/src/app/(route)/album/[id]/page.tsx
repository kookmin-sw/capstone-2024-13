'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Diary } from '@/app/_type';
import style from '../../../_style/(route)/album/[id]/index.module.css';
import Header from '@/app/_component/header';
import AlbumPageDiary from './diary';
import AlbumContext from '@/app/_context/album';
import postFindDiaries from '@/app/_service/postFindDiary';

const AlbumPage = (props: { params: { id: string } }) => {
	const { id } = props.params;
	const { albums } = useContext(AlbumContext);
	const album = albums.find(album => album._id.toString() === id);
	const router = useRouter();
	const [title, setTitle] = useState<string>('');
	const [diaries, setDiaries] = useState<Diary[]>([]);

	useEffect(() => {
		if (!album) {
			router.push('/');
		} else {
			setTitle(album.title);
			postFindDiaries({ albumId: id })
				.then((response: Diary[]) => {
					setDiaries(response);
				})
				.catch((error: Error) => {
					console.error(error);
				});
		}
	}, [id, router, album]);

	return (
		<div className={style.container}>
			<Header title={title} divider />
			<div>
				{diaries.map((diary, index) => (
					<AlbumPageDiary key={index} {...diary} />
				))}
			</div>
		</div>
	);
};

export default AlbumPage;
