import { Diary } from '../_type';
import { postFetcher } from './api';

export const postCreateDiary = async (query: object): Promise<Diary> => {
	return await postFetcher<Diary>('/diary', query).catch((error: any) => {
		throw error;
	});
};
