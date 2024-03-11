import { Diary } from '../../../_type/index';
import style from '../../../_style/(route)/diary/preview/index.module.css';

const parseDate = (date: Date) => {
	const local = new Date(date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
	const month = String(local.getMonth() + 1).padStart(2, '0');
	const day = String(local.getDate()).padStart(2, '0');
	const weekday = local.toLocaleString('ko-KR', { weekday: 'long' });

	return `${month}월 ${day}일 ${weekday}`;
};

const DiaryPreview = (props: { diary: Diary }) => {
	const { diary } = props;

	return (
		<div className={style.container}>
			<div>
				<div>
					<span>{parseDate(diary.createdAt)}</span>
					<span>{diary.title}</span>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default DiaryPreview;
