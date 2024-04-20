import { UpdateQuery, QueryOptions } from 'mongoose';
import { patchFetcher } from './api';
import { Me } from '@/app/_type';

export const patchMe = async (update: UpdateQuery<Me>, options?: QueryOptions<Me>): Promise<Me> => {
	return await patchFetcher<Me>('/user/me', { update, options }).catch((error: Error) => {
		throw error;
	});
};
