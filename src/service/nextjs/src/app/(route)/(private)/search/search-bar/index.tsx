'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Search } from '@mui/icons-material';
import style from '../../../../_style/(route)/(private)/search/search-bar/index.module.css';

const handleChange = (
	event: ChangeEvent<HTMLInputElement>,
	setContent: Dispatch<SetStateAction<string>>,
	setIsSearching: Dispatch<SetStateAction<boolean>>,
) => {
	const { value } = event.target;

	setContent(value);
};

const SearchBar = (props: { setIsSearching: Dispatch<SetStateAction<boolean>> }) => {
	const { setIsSearching } = props;
	const [content, setContent] = useState<string>('');

	return (
		<div className={style.container}>
			<label htmlFor="search" className={style.label}>
				<Search />
				<input
					type="text"
					value={content}
					placeholder="검색어를 입력해주세요"
					onChange={event => {
						handleChange(event, setContent, setIsSearching);
					}}
				/>
			</label>
		</div>
	);
};

export default SearchBar;
