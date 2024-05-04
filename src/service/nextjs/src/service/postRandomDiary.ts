import { Diary } from '@/type';
import { postFetcher } from './api';
import { AggregateOptions, PipelineStage } from 'mongoose';

export const postRandomDiary = async (
	pipeline?: PipelineStage[],
	options?: AggregateOptions,
): Promise<Diary[]> => {
	return await postFetcher<Diary[]>('/diary/aggregate', { pipeline, options }).catch(
		(error: Error) => {
			throw error;
		},
	);
};
