import { MouseEvent } from 'react';
import { Types } from 'mongoose';
import Image from 'next/image';
import Link from 'next/link';
import style from '@/style/container/(private)/search/diary/index.module.css';

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
