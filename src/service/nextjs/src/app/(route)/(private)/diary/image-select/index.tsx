import { Dispatch, SetStateAction, useContext } from 'react';
import { InsertPhoto } from '@mui/icons-material';
import style from '../../../../_style/(route)/(private)/diary/image-select/index.module.css';

const DiaryPageImageSelect = (props: {
	images: string[];
	setImages: Dispatch<SetStateAction<string[]>>;
}) => {
	const { images, setImages } = props;

	return (
		<div className={style.container}>
			<InsertPhoto />
		</div>
	);
};

export default DiaryPageImageSelect;
