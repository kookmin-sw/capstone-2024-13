'use client';

import { useContext } from 'react';
import style from '../../../_style/(route)/(private)/album/index.module.css';
import CreateAlbumButton from './create-album-button';
import AlbumComponent from './album-component';
import AlbumContext from '../../../_context/album';
import Header from '@/app/_component/header';

const AlbumPage = () => {
	const { albums } = useContext(AlbumContext);

	return (
		<>
			<Header title={'앨범'} component={<CreateAlbumButton />} />
			<div className={style.container}>
				{albums.map((album, index) => (
					<AlbumComponent key={index} album={album} />
				))}
			</div>
		</>
	);
};

export default AlbumPage;
