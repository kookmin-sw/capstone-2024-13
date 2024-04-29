import { ReactNode } from 'react';
import style from '@/style/component/diary/header/index.module.css';

const ParseDate = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

	return `${year}. ${month < 10 ? '0' + month : month}. ${
		day < 10 ? '0' + day : day
	}. ${dayOfWeek}`;
};

const DiaryComponentHeader = (props: { createdAt: Date; component?: ReactNode }) => {
	const { createdAt, component } = props;

	return (
		<div className={style.container}>
			<div>
				<span className={style.date}>{ParseDate(new Date(createdAt))}</span>
				{component}
			</div>
		</div>
	);
};

export default DiaryComponentHeader;
