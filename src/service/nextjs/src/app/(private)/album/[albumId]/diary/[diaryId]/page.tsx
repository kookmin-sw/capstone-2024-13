'use client';

import { DeleteForever, Edit, LibraryAdd, RemoveCircle } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { deleteDiary, postFindDiary } from '@/service';
import { Album, Diary } from '@/type';
import DiaryComponent from '@/component/diary';
import MeetballsMenu from '@/component/meetballs-menu';
import Button from '@/component/button';
import AuthContext from '@/context/auth';
import style from '@/style/app/(private)/album/diary/[id]/index.module.css';
import { DeleteResult } from 'mongodb';
import { removeDiaryFromAlbum } from '@/service/removeDiaryFromAlbum';
import AlbumContext from '@/context/album';

const handleEdit = (
	setIsEditing: Dispatch<SetStateAction<boolean>>,
	setIsOpened: Dispatch<SetStateAction<boolean>>,
) => {
	setIsEditing(true);
	setIsOpened(false);
};

const handleRemoveFromAlbum = (
	albumId: string,
	diaryId: string,
	setAlbums: Dispatch<SetStateAction<Album[]>>,
	router: AppRouterInstance,
) => {
	if (!confirm('정말로 삭제하시겠습니까?')) {
		return;
	}

	removeDiaryFromAlbum(albumId, diaryId)
		.then((newAlbum: Album) => {
			setAlbums(albums =>
				albums.map(album => (album._id.toString() === albumId ? newAlbum : album)),
			);
			alert('삭제되었습니다.');
			router.push(`/album/${albumId}`);
		})
		.catch(error => {
			alert('삭제에 실패했습니다.');
		});
};

const handleDelete = (
	id: string,
	setAlbums: Dispatch<SetStateAction<Album[]>>,
	router: AppRouterInstance,
) => {
	if (!confirm('정말로 삭제하시겠습니까?')) {
		return;
	}

	deleteDiary(id)
		.then((albums: Album[]) => {
			for (const album of albums) {
				setAlbums(prevAlbums =>
					prevAlbums.map(prevAlbum =>
						prevAlbum._id.toString() === album._id.toString() ? album : prevAlbum,
					),
				);
			}
			alert('삭제되었습니다.');
			router.back();
		})
		.catch(error => {
			console.error(error);
			alert('삭제에 실패했습니다.');
		});
};

const AlbumIdDiaryIdPage = (props: { params: { diaryId: string } }) => {
	const { diaryId } = props.params;
	const pathname = usePathname();
	const albumId = pathname.split('/')[2];
	const router = useRouter();
	const { me } = useContext(AuthContext);
	const { setAlbums } = useContext(AlbumContext);
	const [diary, setDiary] = useState<Diary | null>(null);
	const [title, setTitle] = useState<string | undefined>(undefined);
	const [content, setContent] = useState<string | undefined>(undefined);
	const [isPublic, setIsPublic] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const buttonProps = [
		{
			text: 'Add to album',
			icon: <LibraryAdd fontSize="small" />,
			handler: () => setIsOpened(false),
		},
		{
			text: 'Edit',
			icon: <Edit fontSize="small" />,
			handler: () => handleEdit(setIsEditing, setIsOpened),
		},
		{
			text: 'Remove from album',
			icon: <RemoveCircle fontSize="small" />,
			handler: () => handleRemoveFromAlbum(albumId, diaryId, setAlbums, router),
		},
		{
			text: 'Delete',
			style: { color: '#ff0000' },
			icon: <DeleteForever fontSize="small" />,
			handler: () => handleDelete(diaryId, setAlbums, router),
		},
	];

	useEffect(() => {
		if (me && !diary) {
			postFindDiary({ _id: diaryId })
				.then(diaries => {
					if (diaries.length === 0) {
						alert('일기를 찾을 수 없습니다.\n잘못된 접근입니다.');
						router.push('/album');
						return;
					}
					setDiary(diaries[0]);
					setTitle(diaries[0].title);
					setContent(diaries[0].content);
					setIsPublic(diaries[0].isPublic);
				})
				.catch(error => {
					alert('일기를 찾을 수 없습니다.\n잘못된 접근입니다.');
					router.push('/album');
					return;
				});
		}
	}, [diaryId, router, me, diary]);

	return (
		<DiaryComponent
			profileImageSrc={me?.profileImageId.toString()}
			author={me?.nickname}
			createdAt={diary?.createdAt}
			title={title}
			content={content}
			isPublic={isPublic}
			isEditing={isEditing}
			images={diary?.images}
			setTitle={setTitle}
			setContent={setContent}
			setIsPublic={setIsPublic}
			setIsEditing={setIsEditing}
			component={
				<MeetballsMenu isOpened={isOpened} setIsOpened={setIsOpened} width={'800cqw'}>
					{buttonProps.map((buttonProp, index) => (
						<Button key={index} className={style.button} onClick={buttonProp.handler}>
							<span style={buttonProp.style}>{buttonProp.text}</span>
							{buttonProp.icon}
						</Button>
					))}
				</MeetballsMenu>
			}
		/>
	);
};

export default AlbumIdDiaryIdPage;
