import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import style from '@/style/component/diary/edit-title/index.module.css';

const DiaryComponentEditTitle = (props: {
	title?: string;
	setTitle: Dispatch<SetStateAction<string | undefined>>;
}) => {
	const { title, setTitle } = props;

	return (
		<label className={style.container}>
			<input
				autoFocus
				type="text"
				value={title}
				placeholder="제목"
				onClick={(event: MouseEvent<HTMLInputElement>) => event.stopPropagation()}
				onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
			/>
		</label>
	);
};

export default DiaryComponentEditTitle;
