'use client';

import { useContext } from 'react';
import style from '../../_style/(route)/diary/index.module.css';
import DiaryContext from '../../_context/diary';
import DiaryPreview from './preview';

const DiaryPage = () => {
	const { diary } = useContext(DiaryContext);

	return (
		<div className={style.container}>
			<div></div>
			<div>{diary && diary?.map((item, index) => <DiaryPreview key={index} diary={item} />)}</div>
		</div>
	);
};

export default DiaryPage;
