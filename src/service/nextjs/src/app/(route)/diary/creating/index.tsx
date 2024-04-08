import { Dispatch, SetStateAction } from 'react';
import style from '../../../_style/(route)/diary/creating/index.module.css';
import { CreatingIcon } from '../icon';

const DiaryPageCreating = (props: { setContent: Dispatch<SetStateAction<string>> }) => {
	return (
		<div className={style.container}>
			<CreatingIcon width={'50cqw'} height={'50cqw'} />
			<div>
				<span>일기를 생성중입니다.</span>
				<span>잠시만 기다려주세요...</span>
			</div>
		</div>
	);
};

export default DiaryPageCreating;
