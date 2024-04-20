import { AnyObject } from 'mongoose';
import { Album } from '../_type';
import { postFetcher } from './api';

export const postCreateAlbum = async (
	doc?: Partial<Album>,
	fields?: any | null,
	options?: boolean | AnyObject,
): Promise<Album> => {
	return await postFetcher<Album>('/album', { doc, fields, options }).catch((error: any) => {
		throw error;
	});
};
