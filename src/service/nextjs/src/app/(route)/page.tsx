'use client';

import { useContext } from 'react';
import Header from '../_component/header';
import style from '../_style/(route)/index.module.css';
import CreateAlbumButton from './(root)/create-album-button';
import AlbumComponent from './(root)/album-component';
import AlbumContext from '../_context/album';

export default function Home() {
	const { albums } = useContext(AlbumContext);

	return (
		<div className={style.container}>
			<Header title="일기 앨범" component={<CreateAlbumButton />} />
			<div>
				{albums.map((album, index) => (
					<AlbumComponent key={index} album={album} />
				))}
			</div>
		</div>
	);
}
