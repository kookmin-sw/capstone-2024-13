'use client';

import { useContext, useEffect, useState } from 'react';
import { Diary } from '@/app/_type';
import { Types } from 'mongoose';
import style from '../../../_style/(route)/(private)/search/index.module.css';
import SearchBar from './search-bar';
import SearchPageDiary from './diary';
import HeaderContext from '@/app/_context/header';
import TabBarVisibilityContext from '@/app/_context/tab-bar-visibility';

const createMockDiaries = (count: number): Diary[] => {
	const diaries: Diary[] = [];

	for (let i = 0; i < count; i++) {
		const _id = new Types.ObjectId();
		const userId = new Types.ObjectId();
		const title = 'Title' + (i < 10 ? '0' + i : i);
		const content = ('Content' + (i < 10 ? '0' + i : i)).repeat(Math.floor(Math.random() * 20) + 1);
		const isPublic = Math.random() > 0.5;
		const createdAt = new Date();
		const updatedAt = new Date();
		const images = [];
		const imageLength = Math.floor(Math.random() * 5) + 1;
		for (let j = 0; j < imageLength; j++) {
			images.push(`/default-image-0${Math.floor(Math.random() * 10)}.png`);
		}
		const albumId = new Types.ObjectId();

		diaries.push({
			_id,
			userId,
			title,
			content,
			isPublic,
			createdAt,
			updatedAt,
			images,
			albumId,
		});
	}
	return diaries;
};

const SearchPage = () => {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [diaries, setDiaries] = useState<Diary[]>(createMockDiaries(20));
	const { setTitle, setComponent } = useContext(HeaderContext);

	useEffect(() => {
		setTitle('검색');
		setComponent(null);
	}, [setTitle, setComponent]);

	return (
		<>
			<SearchBar setIsSearching={setIsSearching} />
			<div className={style.container}>
				{isSearching ? (
					<div>검색 중...</div>
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
