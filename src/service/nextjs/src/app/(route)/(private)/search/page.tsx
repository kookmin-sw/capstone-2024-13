'use client';

import { useContext, useEffect, useState } from 'react';
import { Diary } from '@/app/_type';
import style from '../../../_style/(route)/(private)/search/index.module.css';
import SearchBar from './search-bar';
import SearchPageDiary from './diary';
import HeaderContext from '@/app/_context/header';
import { getRandomDiary } from '@/app/_service/getRandomDiary';
import { CircularProgress } from '@mui/material';

const SearchPage = () => {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const { setTitle, setComponent } = useContext(HeaderContext);

	useEffect(() => {
		setTitle('검색');
		setComponent(null);
		setIsSearching(true);
		getRandomDiary().then((response: Diary[]) => {
			setDiaries(response);
			setIsSearching(false);
		});
	}, [setTitle, setComponent]);

	return (
		<>
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
