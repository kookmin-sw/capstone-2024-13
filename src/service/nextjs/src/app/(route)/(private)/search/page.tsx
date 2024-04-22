'use client';

import { useEffect, useState } from 'react';
import { Diary } from '@/app/_type';
import style from '../../../_style/(route)/(private)/search/index.module.css';
import SearchBar from './search-bar';
import SearchPageDiary from './diary';
import { getRandomDiary } from '@/app/_service/getRandomDiary';
import { CircularProgress } from '@mui/material';
import Header from '@/app/_component/header';

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
		<>
			<Header title="검색" />
			<SearchBar setIsSearching={setIsSearching} />
			<div className={style.container}>
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
		</>
	);
};

export default SearchPage;
