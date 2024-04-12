'use client';

import Image from 'next/image';
import style from '../../../../_style/(route)/(private)/diary/final-draft/index.module.css';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

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
	}, []);

	return (
		<div className={style.container}>
			<div>
				<Image src={images[0]} alt="Thumbnail" fill sizes="100%" priority />
			</div>
			<textarea
				ref={textareaRef}
				value={content}
				onChange={event => {
					const textarea = event.target;

					setContent(textarea.value);
					textarea.style.height = 'auto';
					textarea.style.height = `${textarea.scrollHeight + 8}px`;
				}}
			/>
			<div>
				<label>
					<input
						type="text"
						placeholder="제목"
						value={title}
						onChange={event => setTitle(event.target.value)}
					/>
				</label>
				<div>
					<span>공개여부</span>
					<input
						type="checkbox"
						id="toggle"
						hidden
						className={style.checkbox}
						onChange={() => setIsPublic(!isPublic)}
					/>
					<label htmlFor="toggle" className={style.toggle}>
						<span className={style.slider} />
					</label>
				</div>
			</div>
		</div>
	);
};

export default DiaryPageFinalDraft;
