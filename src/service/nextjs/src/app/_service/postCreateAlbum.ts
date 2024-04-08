import { Album } from '../../../../nestjs/src/common/database/schema/album.schema';
import { postFetcher } from './api';

export const postCreateAlbum = async (query: object): Promise<Album[]> => {
	const { title } = query as { title: string };

	return await postFetcher<Album[]>('/album/create', { title }).catch((error: any) => {
		throw error;
	});
};
