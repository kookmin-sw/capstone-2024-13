import { Types } from 'mongoose';
import Image from 'next/image';
import style from '../../../../_style/(route)/(private)/search/diary/index.module.css';
import Link from 'next/link';
import { MouseEvent } from 'react';

const SearchPageDiary = (props: { _id: Types.ObjectId; images?: string[] }) => {
	const { _id, images = [] } = props;

	return (
		<div className={style.container}>
			<Link
				href={`/search/diary/${_id}`}
				onClick={(event: MouseEvent<HTMLAnchorElement>) => event.stopPropagation()}
			>
				{0 < images.length && <Image src={images[0]} alt="diary" fill sizes="100%" priority />}
			</Link>
		</div>
	);
};

export default SearchPageDiary;
