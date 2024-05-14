'use client';

import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { Search } from '@mui/icons-material';
import style from '@/style/container/(private)/search/search-bar/index.module.css';
import { Diary } from '@/type';
import { postSearchDiary } from '@/service';

let latestId = 0;

const handleChange = async (
	event: ChangeEvent<HTMLInputElement>,
	setContent: Dispatch<SetStateAction<string>>,
	setDiaries: Dispatch<SetStateAction<Diary[]>>,
	setIsSearching: Dispatch<SetStateAction<boolean>>,
	searchTimeout: NodeJS.Timeout | undefined,
	setSearchTimeout: Dispatch<SetStateAction<NodeJS.Timeout | undefined>>,
) => {
	const { value } = event.target;

	setContent(value);
	setIsSearching(true);

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
	setDiaries: Dispatch<SetStateAction<Diary[]>>;
	setIsSearching: Dispatch<SetStateAction<boolean>>;
}) => {
	const { setDiaries, setIsSearching } = props;
	const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>(undefined);
	const [content, setContent] = useState<string>('');

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
					value={content}
					placeholder="검색어를 입력해주세요"
					onClick={(event: MouseEvent<HTMLInputElement>) => {
						event.stopPropagation();
					}}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						handleChange(
							event,
							setContent,
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
