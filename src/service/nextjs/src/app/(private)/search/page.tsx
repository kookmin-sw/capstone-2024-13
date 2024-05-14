'use client';

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Diary } from '@/type';
import { postRandomDiary } from '@/service';
import Header from '@/component/header';
import SearchBar from '@/container/(private)/search/search-bar';
import SearchPageDiary from '@/container/(private)/search/diary';
import style from '@/style/app/(private)/search/index.module.css';

const SearchPage = () => {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const router = useRouter();

	useEffect(() => {
		setIsSearching(true);
		postRandomDiary([{ $match: { isPublic: true } }, { $sample: { size: 20 } }])
			.then((response: Diary[]) => {
				setDiaries(response);
				setIsSearching(false);
			})
			.catch((error: Error) => {
				console.error(error);
			});
	}, []);

	return (
		<div className={style.container}>
			<Header title="검색" />
			<SearchBar setDiaries={setDiaries} setIsSearching={setIsSearching} />
			<div>
				{isSearching ? (
					<CircularProgress />
				) : (
					<>
						{diaries.map((diary, index) => (
							<SearchPageDiary key={index} {...diary} />
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default SearchPage;
