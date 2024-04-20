import { Diary } from '../_type';
import { getFetcher } from './api';

export const getRandomDiary = async (): Promise<Diary[]> => {
	return await getFetcher<Diary[]>('/diary/random').catch((error: Error) => {
		throw error;
	});
};
