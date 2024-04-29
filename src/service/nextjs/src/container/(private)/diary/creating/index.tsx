import { Dispatch, SetStateAction } from 'react';
import { CreatingIcon } from '../icon';
import style from '@/style/container/(private)/diary/creating/index.module.css';

const DiaryPageCreating = (props: { setContent: Dispatch<SetStateAction<string>> }) => {
	const { setContent } = props;

	return (
		<>
			<CreatingIcon width={'50cqw'} height={'50cqw'} className={style.icon} />
			<span className={style.title}>일기를 생성중입니다.</span>
			<span className={style.description}>잠시만 기다려주세요...</span>
		</>
	);
};

export default DiaryPageCreating;
