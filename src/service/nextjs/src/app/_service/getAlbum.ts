import { Album } from '../../../../nestjs/src/common/database/schema/album.schema';
import { getFetcher } from './api';

export const getAlbum = async (): Promise<Album[]> => {
	return await getFetcher<Album[]>('/album').catch((error: any) => {
		throw error;
	});
};
