import { Types } from 'mongoose';
import Image from 'next/image';
import style from '../../_style/(route)/album/index.module.css';
import Link from 'next/link';

const Album = (props: { _id: Types.ObjectId; thumbnail: string; title: string; count: number }) => {
	const { _id, thumbnail, title, count } = props;

	return (
		<div className={style.container}>
			<Link href={`/album/${_id}`}>
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
