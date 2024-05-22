'use client';

import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { Search } from '@mui/icons-material';
import style from '@/style/container/(private)/search/search-bar/index.module.css';
import { Diary } from '@/type';
import { postSearchDiary } from '@/service';

let latestId = 0;

const handleChange = async (
	event: ChangeEvent<HTMLInputElement>,
	setQuery: Dispatch<SetStateAction<string | undefined>>,
	setDiaries: Dispatch<SetStateAction<Diary[]>>,
	setIsSearching: Dispatch<SetStateAction<boolean>>,
	searchTimeout: NodeJS.Timeout | undefined,
	setSearchTimeout: Dispatch<SetStateAction<NodeJS.Timeout | undefined>>,
) => {
	const { value } = event.target;

	setQuery(value);
	setIsSearching(true);

	if (value.length === 0) {
		setQuery(undefined);
		setIsSearching(false);
	}
	if (value.length < 2) {
		return;
	}

	const id = ++latestId;

	if (searchTimeout) {
		clearTimeout(searchTimeout);
	}
	setSearchTimeout(
		setTimeout(async () => {
			await postSearchDiary(value)
				.then((response: Diary[]) => {
					if (id === latestId) {
						setDiaries(response);
						setIsSearching(false);
					}
				})
				.catch((error: Error) => {
					console.error(error);
				});
		}, 500),
	);
};

const SearchBar = (props: {
	query: string | undefined;
	setQuery: Dispatch<SetStateAction<string | undefined>>;
	setDiaries: Dispatch<SetStateAction<Diary[]>>;
	setIsSearching: Dispatch<SetStateAction<boolean>>;
}) => {
	const { query, setQuery, setDiaries, setIsSearching } = props;
	const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>(undefined);

	return (
		<div className={style.container}>
			<label
				htmlFor="search"
				className={style.label}
				onClick={(event: MouseEvent<HTMLLabelElement>) => {
					event.stopPropagation();
				}}
			>
				<Search />
				<input
					type="text"
					value={query ? query : ''}
					placeholder="검색어를 입력해주세요"
					onClick={(event: MouseEvent<HTMLInputElement>) => {
						event.stopPropagation();
					}}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						handleChange(
							event,
							setQuery,
							setDiaries,
							setIsSearching,
							searchTimeout,
							setSearchTimeout,
						);
					}}
				/>
			</label>
		</div>
	);
};

export default SearchBar;
