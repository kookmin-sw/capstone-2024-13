import Image from 'next/image';
import style from '../../../../_style/(route)/(private)/album/album-component/index.module.css';
import Link from 'next/link';
import { Album } from '@/app/_type';

const AlbumComponent = (props: { album: Album }) => {
	const { _id, title, count, thumbnail } = props.album;

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

export default AlbumComponent;
