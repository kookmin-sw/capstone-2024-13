import { Album } from '@/type';
import { getFetcher } from './api';

export const getAlbums = async (): Promise<Album[]> => {
	return await getFetcher<Album[]>('/album').catch((error: Error) => {
		throw error;
	});
};
