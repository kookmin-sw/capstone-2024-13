import Image from 'next/image';
import style from '../../../_style/(route)/diary/final-draft/index.module.css';
import { useState } from 'react';

const DiaryPageFinalDraft = () => {
	const randomIndex = Math.floor(Math.random() * 10);
	const [title, setTitle] = useState<string>('');

	return (
		<div className={style.container}>
			<div>
				<Image
					src={`/default-image-0${randomIndex}.png`}
					alt="Thumbnail"
					fill
					sizes="100%"
					priority
				/>
			</div>
			<span>ContentContentContentContentContentContentContentContentContentContent</span>
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
					<input type="checkbox" id="toggle" hidden className={style.checkbox} />
					<label htmlFor="toggle" className={style.toggle}>
						<span className={style.slider} />
					</label>
				</div>
			</div>
		</div>
	);
};

export default DiaryPageFinalDraft;
