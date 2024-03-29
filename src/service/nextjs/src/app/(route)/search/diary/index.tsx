import Image from 'next/image';
import style from '../../../_style/(route)/search/diary/index.module.css';

const SearchPageDiary = (props: { src?: string }) => {
	const { src } = props;

	return (
		<div className={style.container}>
			{src && <Image src={src} alt="diary" fill style={{ objectFit: 'cover' }} />}
		</div>
	);
};

export default SearchPageDiary;
