'use client';

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Diary } from '@/type';
import { getRandomDiary } from '@/service/getRandomDiary';
import Header from '@/component/header';
import SearchBar from '@/container/(private)/search/search-bar';
import SearchPageDiary from '@/container/(private)/search/diary';
import style from '@/style/app/(private)/search/index.module.css';

const SearchPage = () => {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [diaries, setDiaries] = useState<Diary[]>([]);

	useEffect(() => {
		setIsSearching(true);
		getRandomDiary().then((response: Diary[]) => {
			setDiaries(response);
			setIsSearching(false);
		});
	}, []);

	return (
		<div className={style.container}>
			<Header title="검색" />
			<SearchBar setIsSearching={setIsSearching} />
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
