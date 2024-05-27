import { useContext } from 'react';
import AlbumContext from '@/context/album';
import Album from '@/container/(private)/album/album';
import CreateAlbumButton from '@/container/(private)/album/create-album-button';
import Header from '@/component/header';
import style from '@/style/app/(private)/album/index.module.css';

const AlbumPage = () => {
	const { albums } = useContext(AlbumContext);

	return (
		<div className={style.container}>
			<Header title={'앨범'} component={<CreateAlbumButton />} />
			<div>
				{albums.map((album, index) => (
					<Album key={index} album={album} />
				))}
			</div>
		</div>
	);
};

export default AlbumPage;
