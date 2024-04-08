import { Diary } from '../_type';
import { postFetcher } from './api';

const postFindDiary = async (query: object): Promise<Diary[]> => {
	return await postFetcher<Diary[]>('/diary/find', query).catch((error: any) => {
		throw error;
	});
};

export default postFindDiary;
