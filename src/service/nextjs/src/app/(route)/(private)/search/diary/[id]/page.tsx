'use client';

import DiaryComponent from '@/app/_component/diary';
import HeaderContext from '@/app/_context/header';
import { getDiary } from '@/app/_service';
import { postFindUserById } from '@/app/_service/postFindUserById';
import { Diary, User } from '@/app/_type';
import { useContext, useEffect, useState } from 'react';

const SearchDiaryPage = (props: { params: { id: string } }) => {
	const { id } = props.params;
	const { setTitle, setComponent } = useContext(HeaderContext);
	const [diary, setDiary] = useState<Diary | null>(null);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (!diary) {
			setTitle('');
			setComponent(null);
			getDiary(id).then((response: Diary) => {
				setDiary(response);
			});
		}
		if (diary) {
			postFindUserById(diary.userId.toString()).then((response: User) => {
				setUser(response);
			});
		}
	}, [diary, setTitle, setComponent, id]);

	return (
		diary &&
		user && (
			<DiaryComponent
				profileImageSrc={user.profileImageId.toString()}
				author={user.nickname}
				createdAt={diary.createdAt}
				title={diary.title}
				content={diary.content}
				isPublic={diary.isPublic}
				images={diary.images}
			/>
		)
	);
};

export default SearchDiaryPage;
