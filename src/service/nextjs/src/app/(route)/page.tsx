import { Types } from 'mongoose';
import Header from '../_component/header';
import style from '../_style/(route)/index.module.css';
import CreateAlbumButton from './(root)/create-album-button';
import Album from './album';

const CreateMockAlbum = (count: number) => {
	const albums = [];

	for (let i = 0; i < count; i++) {
		const _id = new Types.ObjectId();
		const thumbnail = `/default-image-0${Math.floor(Math.random() * 10)}.png`;
		const title = 'Album' + (i < 10 ? '0' + i : i);

		albums.push({
			_id,
			thumbnail,
			title,
			count: Math.floor(Math.random() * 100),
		});
	}
	return albums;
};

export default function Home() {
	const albums = CreateMockAlbum(10);

	return (
		<div className={style.container}>
			<Header title="일기 앨범" component={<CreateAlbumButton />} />
			<div>
				{albums.map((album, index) => (
					<Album key={index} {...album} />
				))}
			</div>
		</div>
	);
}
