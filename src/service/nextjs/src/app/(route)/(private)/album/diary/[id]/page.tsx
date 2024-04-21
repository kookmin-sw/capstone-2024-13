'use client';

import Button from '@/app/_component/button';
import style from '../../../../../_style/(route)/(private)/album/diary/[id]/index.module.css';
import DiaryComponent from '@/app/_component/diary';
import MeetballsMenu from '@/app/_component/meetballs-menu';
import AuthContext from '@/app/_context/auth';
import HeaderContext from '@/app/_context/header';
import { deleteDiary, postFindDiary } from '@/app/_service';
import { Diary } from '@/app/_type';
import { DeleteForever, Edit, LibraryAdd } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const handleEdit = (
	setIsEditing: Dispatch<SetStateAction<boolean>>,
	setIsOpened: Dispatch<SetStateAction<boolean>>,
) => {
	setIsEditing(true);
	setIsOpened(false);
};

const handleDelete = (id: string, router: AppRouterInstance) => {
	if (!confirm('정말로 삭제하시겠습니까?')) {
		return;
	}

	deleteDiary({ id })
		.then(() => {
			alert('삭제되었습니다.');
			router.back();
		})
		.catch(error => {
			alert('삭제에 실패했습니다.');
		});
};

const AlbumDiaryIdPage = (props: { params: { id: string } }) => {
	const { id } = props.params;
	const router = useRouter();
	const { me } = useContext(AuthContext);
	const { setTitle: setHeaderTitle, setComponent: setHeaderComponent } = useContext(HeaderContext);
	const [diary, setDiary] = useState<Diary | null>(null);
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [isPublic, setIsPublic] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isOpened, setIsOpened] = useState<boolean>(false);

	useEffect(() => {
		if (me && !diary) {
			postFindDiary({ _id: id })
				.then(diaries => {
					if (diaries.length === 0) {
						alert('일기를 찾을 수 없습니다.\n잘못된 접근입니다.');
						router.push('/album');
					}
					setHeaderTitle('');
					setHeaderComponent(null);
					setDiary(diaries[0]);
					setTitle(diaries[0].title);
					setContent(diaries[0].content);
					setIsPublic(diaries[0].isPublic);
				})
				.catch(error => {
					alert('일기를 찾을 수 없습니다.\n잘못된 접근입니다.');
					router.push('/album');
				});
		}
	}, [me, diary]);

	return (
		me &&
		diary && (
			<DiaryComponent
				profileImageSrc={me.profileImageId.toString()}
				author={me.nickname}
				createdAt={diary.createdAt}
				title={title}
				content={content}
				isPublic={isPublic}
				isEditing={isEditing}
				images={diary.images}
				setTitle={setTitle}
				setContent={setContent}
				setIsPublic={setIsPublic}
				setIsEditing={setIsEditing}
				component={
					<MeetballsMenu isOpened={isOpened} setIsOpened={setIsOpened} width={'570cqw'}>
						<Button className={style.button} onClick={() => setIsOpened(false)}>
							<span>Add to album</span>
							<LibraryAdd fontSize="small" />
						</Button>
						<Button className={style.button} onClick={() => handleEdit(setIsEditing, setIsOpened)}>
							<span>Edit</span>
							<Edit fontSize="small" />
						</Button>
						<Button className={style.button} onClick={() => handleDelete(id, router)}>
							<span style={{ color: '#ff0000' }}>Delete</span>
							<DeleteForever fontSize="small" />
						</Button>
					</MeetballsMenu>
				}
			/>
		)
	);
};

export default AlbumDiaryIdPage;
