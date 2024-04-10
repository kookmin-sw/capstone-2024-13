import Image from 'next/image';
import style from '../../../_style/(route)/diary/final-draft/index.module.css';
import { Dispatch, SetStateAction, useState } from 'react';

const DiaryPageFinalDraft = (props: {
	title: string;
	setTitle: Dispatch<SetStateAction<string>>;
	content: string;
	images: string[];
	isPublic: boolean;
	setIsPublic: Dispatch<SetStateAction<boolean>>;
}) => {
	const { title, setTitle, content, images, isPublic, setIsPublic } = props;

	return (
		<div className={style.container}>
			<div>
				<Image src={images[0]} alt="Thumbnail" fill sizes="100%" priority />
			</div>
			<span>{content}</span>
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
