import { Diary } from '../_type';
import { getFetcher } from './api';

export const getDiary = async (id: string): Promise<Diary> => {
	return await getFetcher<Diary>(`/diary/${id}`).catch((error: Error) => {
		throw error;
	});
};
