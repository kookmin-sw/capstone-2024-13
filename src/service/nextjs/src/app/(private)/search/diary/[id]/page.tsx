'use client';

import DiaryComponent from '@/component/diary';
import { getDiary } from '@/service';
import { postFindUserById } from '@/service/postFindUserById';
import { Diary, User } from '@/type';
import { useEffect, useState } from 'react';

const SearchDiaryPage = (props: { params: { id: string } }) => {
	const { id } = props.params;
	const [diary, setDiary] = useState<Diary | null>(null);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (!diary) {
			getDiary(id).then((response: Diary) => {
				setDiary(response);
			});
		}
		if (diary) {
			postFindUserById(diary.userId.toString()).then((response: User) => {
				setUser(response);
			});
		}
	}, [diary, id]);

	return (
		<DiaryComponent
			profileImageSrc={user?.profileImageId.toString()}
			author={user?.nickname}
			createdAt={diary?.createdAt}
			title={diary?.title}
			content={diary?.content}
			isPublic={diary?.isPublic}
			images={diary?.images}
		/>
	);
};

export default SearchDiaryPage;
