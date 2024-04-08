import { Dispatch, SetStateAction } from 'react';
import style from '../../../_style/(route)/diary/image-select/index.module.css';

const DiaryPageImageSelect = (props: {
	images: string[];
	setImages: Dispatch<SetStateAction<string[]>>;
}) => {
	const { images, setImages } = props;

	return (
		<div className={style.container}>
			<div>
				<span>+</span>
			</div>
		</div>
	);
};

export default DiaryPageImageSelect;
