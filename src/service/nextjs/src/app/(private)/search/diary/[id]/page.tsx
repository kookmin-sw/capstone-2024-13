'use client';

import DiaryComponent from '@/component/diary';
import { getDiary } from '@/service';
import { postFindUserById } from '@/service/postFindUserById';
import { Diary, User } from '@/type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchDiaryIdPage = (props: { params: { id: string } }) => {
	const { id } = props.params;
	const [diary, setDiary] = useState<Diary | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (!diary) {
			getDiary(id)
				.then((response: Diary) => {
					if (!response.isPublic) {
						alert('잘못된 접근입니다.');
						router.push('/search');
						return;
					} else {
						setDiary(response);
					}
				})
				.catch((error: Error) => {
					alert('다이어리를 불러오는데 실패했습니다.');
					router.push('/search');
				});
		}
		if (diary) {
			postFindUserById(diary.userId.toString()).then((response: User) => {
				setUser(response);
			});
		}
	}, [diary, id, router]);

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

export default SearchDiaryIdPage;
