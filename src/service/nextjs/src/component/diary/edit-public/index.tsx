import { Dispatch, MouseEvent, SetStateAction } from 'react';
import style from '@/style/component/diary/edit-public/index.module.css';

const DiaryComponentEditPublic = (props: {
	isPublic: boolean;
	setIsPublic: Dispatch<SetStateAction<boolean>>;
}) => {
	const { isPublic, setIsPublic } = props;

	return (
		<div className={style.container}>
			<span className={style.label}>공개여부</span>
			<input
				type="checkbox"
				id="toggle"
				hidden
				className={style.checkbox}
				checked={isPublic}
				onChange={() => {
					setIsPublic(!isPublic);
				}}
				onClick={(event: MouseEvent<HTMLInputElement>) => {
					event.stopPropagation();
				}}
			/>
			<label
				htmlFor="toggle"
				className={style.toggle}
				onClick={(event: MouseEvent<HTMLLabelElement>) => {
					event.stopPropagation();
				}}
			>
				<span className={style.slider} />
			</label>
		</div>
	);
};

export default DiaryComponentEditPublic;
