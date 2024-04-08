import { Album } from '../_type';
import { postFetcher } from './api';

export const postCreateAlbum = async (query: object): Promise<Album> => {
	return await postFetcher<Album>('/album', query).catch((error: any) => {
		throw error;
	});
};
