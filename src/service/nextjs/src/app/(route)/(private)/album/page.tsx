'use client';

import { useContext, useEffect } from 'react';
import style from '../../../_style/(route)/(private)/album/index.module.css';
import CreateAlbumButton from './create-album-button';
import AlbumComponent from './album-component';
import AlbumContext from '../../../_context/album';
import HeaderContext from '../../../_context/header';

const AlbumPage = () => {
	const { albums } = useContext(AlbumContext);
	const { setTitle, setComponent } = useContext(HeaderContext);

	useEffect(() => {
		setTitle('앨범');
		setComponent(<CreateAlbumButton />);
	}, [setTitle, setComponent]);

	return (
		<div className={style.container}>
			{albums.map((album, index) => (
				<AlbumComponent key={index} album={album} />
			))}
		</div>
	);
};

export default AlbumPage;
