import { MouseEvent } from 'react';
import * as Type from '@/type';
import Image from 'next/image';
import Link from 'next/link';
import style from '@/style/container/(private)/album/album/index.module.css';

const Album = (props: { album: Type.Album }) => {
	const { _id, title, count, thumbnail } = props.album;

	return (
		<div className={style.container}>
			<Link
				href={`/album/${_id}`}
				onClick={(event: MouseEvent<HTMLAnchorElement>) => event.stopPropagation()}
			>
				<div>{thumbnail && <Image src={thumbnail} alt={title} fill sizes="100%" priority />}</div>
				<div>
					<span>{title}</span>
					<span>{count}</span>
				</div>
			</Link>
		</div>
	);
};

export default Album;
