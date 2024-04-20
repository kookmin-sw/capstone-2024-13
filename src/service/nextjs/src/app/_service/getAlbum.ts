import { Album } from '../_type';
import { getFetcher } from './api';

export const getAlbum = async (): Promise<Album[]> => {
	return await getFetcher<Album[]>('/album').catch((error: Error) => {
		throw error;
	});
};
