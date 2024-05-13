'use client';

import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Album, Diary } from '@/type';
import { postFindDiary } from '@/service';
import AlbumContext from '@/context/album';
import Header from '@/component/header';
import AlbumPageDiary from '@/container/(private)/album/[albumId]/diary';
import style from '@/style/app/(private)/album/[albumId]/index.module.css';
import MeetballsMenu from '@/component/meetballs-menu';
import { DeleteForever } from '@mui/icons-material';
import Button from '@/component/button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { deleteFetcher, getFetcher } from '@/service/api';
import { AxiosError } from 'axios';

const handleDelete = async (
	id: string,
	setAlbums: Dispatch<SetStateAction<Album[]>>,
	router: AppRouterInstance,
) => {
	if (!confirm('정말로 삭제하시겠습니까?')) {
		return;
	}

	if (!confirm('앨범에 있는 모든 일기가 삭제됩니다. 계속하시겠습니까?')) {
		return;
	}

	await deleteFetcher<Album[]>(`/album/${id}`).catch((error: AxiosError) => {
		alert('삭제에 실패했습니다.');
		return;
	});

	await getFetcher<Album[]>('/album')
		.then((response: Album[]) => {
			setAlbums(response);
		})
		.finally(() => {
			router.push('/album');
		});
};

const AlbumPage = (props: { params: { albumId: string } }) => {
	const { albumId } = props.params;
	const { albums, setAlbums } = useContext(AlbumContext);
	const router = useRouter();
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);
	const [isOpened, setIsOpened] = useState<boolean>(false);

	useEffect(() => {
		if (albums.length && !albums.find(album => album._id.toString() === albumId)) {
			router.push('/album');
			alert('잘못된 접근입니다.');
			return;
		}
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
	}, [albumId, router, isInitialized]);

	return (
		<div className={style.container}>
			<Header
				title={albums.find(album => album._id.toString() === albumId)?.title}
				component={
					<MeetballsMenu isOpened={isOpened} setIsOpened={setIsOpened} width={'600cqw'}>
						<Button
							className={style.button}
							onClick={() => handleDelete(albumId, setAlbums, router)}
						>
							<span>앨범 삭제하기</span>
							<DeleteForever fontSize="medium" />
						</Button>
					</MeetballsMenu>
				}
			/>
			<div>
				{diaries.map((diary, index) => (
					<AlbumPageDiary key={index} albumId={albumId} diary={diary} />
				))}
			</div>
		</div>
	);
};

export default AlbumPage;
