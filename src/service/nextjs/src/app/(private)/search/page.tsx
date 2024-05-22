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
	const [query, setQuery] = useState<string | undefined>(undefined);
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (query === undefined) {
			setIsSearching(true);
			postRandomDiary([{ $match: { isPublic: true } }, { $sample: { size: 20 } }])
				.then((response: Diary[]) => {
					setDiaries(response);
					setIsSearching(false);
				})
				.catch((error: Error) => {
					console.error(error);
				});
		}
	}, [query]);

	return (
		<div className={style.container}>
			<Header title="검색" />
			<SearchBar
				query={query}
				setQuery={setQuery}
				setDiaries={setDiaries}
				setIsSearching={setIsSearching}
			/>
			<div>
				{isSearching ? (
					query && 2 <= query.length ? (
						<CircularProgress />
					) : (
						<span className={style.notice}>검색어를 2글자 이상 입력해주세요.</span>
					)
				) : diaries.length === 0 ? (
					<span className={style.notice}>검색 결과가 없습니다.</span>
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
