'use client';

import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useRef } from 'react';
import Image from 'next/image';
import style from '@/style/container/(private)/diary/final-draft/index.module.css';

const DiaryPageFinalDraft = (props: {
	title: string;
	setTitle: Dispatch<SetStateAction<string>>;
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
	images: string[];
	isPublic: boolean;
	setIsPublic: Dispatch<SetStateAction<boolean>>;
}) => {
	const { title, setTitle, content, setContent, images, isPublic, setIsPublic } = props;
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const textarea = textareaRef.current;

		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight + 8}px`;
		}
	}, [content]);

	return (
		<div className={style.container}>
			<div>
				{0 < images.length && <Image src={images[0]} alt="Thumbnail" fill sizes="100%" priority />}
			</div>
			<textarea
				ref={textareaRef}
				value={content}
				onClick={(event: MouseEvent<HTMLTextAreaElement>) => {
					event.preventDefault();
					event.stopPropagation();
				}}
				onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)}
			/>
			<div>
				<label>
					<input
						type="text"
						placeholder="제목"
						value={title}
						onClick={(event: MouseEvent<HTMLInputElement>) => {
							event.preventDefault();
							event.stopPropagation();
						}}
						onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
					/>
				</label>
				<div>
					<span>공개여부</span>
					<input
						type="checkbox"
						id="toggle"
						hidden
						className={style.checkbox}
						onClick={(event: MouseEvent<HTMLInputElement>) => {
							event.stopPropagation();
						}}
						onChange={() => setIsPublic(!isPublic)}
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
			</div>
		</div>
	);
};

export default DiaryPageFinalDraft;
