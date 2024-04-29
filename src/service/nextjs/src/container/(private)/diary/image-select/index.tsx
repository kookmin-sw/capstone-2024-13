import { Dispatch, SetStateAction, useContext } from 'react';
import { InsertPhoto } from '@mui/icons-material';
import style from '@/style/container/(private)/diary/image-select/index.module.css';

const DiaryPageImageSelect = (props: {
	images: string[];
	setImages: Dispatch<SetStateAction<string[]>>;
}) => {
	const { images, setImages } = props;

	return (
		<div className={style.container}>
			<div className={style.selector}>
				<InsertPhoto />
			</div>
		</div>
	);
};

export default DiaryPageImageSelect;
