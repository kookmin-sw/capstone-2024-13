import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useRef } from 'react';
import style from '../../../_style/component/diary/edit-content/index.module.css';

const DiaryComponentEditContent = (props: {
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
}) => {
	const { content, setContent } = props;
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight + 4}px`;
		}
	}, []);

	return (
		<textarea
			rows={1}
			value={content}
			ref={textareaRef}
			className={style.container}
			onClick={(event: MouseEvent<HTMLTextAreaElement>) => event.stopPropagation()}
			onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
				const textarea = event.target;

				setContent(textarea.value);
				textarea.style.height = 'auto';
				textarea.style.height = `${textarea.scrollHeight + 8}px`;
			}}
		/>
	);
};

export default DiaryComponentEditContent;
