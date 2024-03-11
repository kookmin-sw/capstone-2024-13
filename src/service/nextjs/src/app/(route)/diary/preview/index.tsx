'use client';

import { useState } from 'react';
import { Diary } from '../../../_type/index';
import style from '../../../_style/(route)/diary/preview/index.module.css';
import DiaryPreviewImage from './image';

const parseDate = (date: Date) => {
	const local = new Date(date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
	const month = String(local.getMonth() + 1).padStart(2, '0');
	const day = String(local.getDate()).padStart(2, '0');
	const weekday = local.toLocaleString('ko-KR', { weekday: 'long' });

	return `${month}월 ${day}일 ${weekday}`;
};

const DiaryPreview = (props: { diary: Diary }) => {
	const { diary } = props;
	const src = 0.5 < Math.random() ? '/test-image-00.png' : '/test-image-01.png';
	const [isColumnDirection, setIsColumnDirection] = useState<boolean>(false);

	return (
		<div className={style.container}>
			<div className={style.title}>
				<div>
					<span>{parseDate(diary.createdAt)}</span>
					<span>{diary.title}</span>
				</div>
			</div>
			<div className={style.content}>
				<div style={{ flexDirection: isColumnDirection ? 'column' : 'row' }}>
					<DiaryPreviewImage
						src={src}
						isColumnDirection={isColumnDirection}
						setIsColumnDirection={setIsColumnDirection}
					/>
				</div>
			</div>
		</div>
	);
};

export default DiaryPreview;
