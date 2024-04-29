import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { Diary } from '@/type';
import { postFetcher } from './api';

export const postFindDiary = async (
	filter: FilterQuery<Diary>,
	projection?: ProjectionType<Diary>,
	options?: QueryOptions<Diary>,
): Promise<Diary[]> => {
	return await postFetcher<Diary[]>('/diary/find', { filter, projection, options }).catch(
		(error: Error) => {
			throw error;
		},
	);
};
