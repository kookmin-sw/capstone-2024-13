'use client';

import { Album } from '../../_type/index';
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import AuthContext from '../auth';
import { getAlbum } from '@/app/_service';

const AlbumContext = createContext<{
	album: Album[] | null;
	setAlbum: Dispatch<SetStateAction<Album[] | null>>;
}>({
	album: null,
	setAlbum: () => {},
});

export const AlbumProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [album, setAlbum] = useState<Album[] | null>(null);
	const { me } = useContext(AuthContext);

	useEffect(() => {
		if (me) {
			getAlbum()
				.then((response: any) => {
					setAlbum(response);
				})
				.catch(error => {
					setAlbum(null);
				});
		}
	}, [me]);

	return <AlbumContext.Provider value={{ album, setAlbum }}>{children}</AlbumContext.Provider>;
};

export default AlbumContext;
