'use client';

import { useState } from 'react';
import Header from '@/app/_component/header';
import style from '../../_style/(route)/search/index.module.css';
import SearchBar from './search-bar';
import { Diary } from '@/app/_type';
import { Types } from 'mongoose';
import SearchPageDiary from './diary';

const createMockDiaries = (count: number): Diary[] => {
	const diaries: Diary[] = [];

	for (let i = 0; i < count; i++) {
		const index = 10 < count && i < 10 ? '0' + i : i + '';

		diaries.push({
			_id: new Types.ObjectId(),
			title: `title${index}`,
			content: `content${index}`,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
	return diaries;
};

const SearchPage = () => {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [diaries, setDiaries] = useState<Diary[]>(createMockDiaries(10));

	return (
		<div className={style.container}>
			<Header title="검색" />
			<SearchBar setIsSearching={setIsSearching} />
			<div>
				{isSearching ? (
					<div>검색 중...</div>
				) : (
					<>
						{diaries.map((diary, index) => (
							<SearchPageDiary key={index} />
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default SearchPage;
