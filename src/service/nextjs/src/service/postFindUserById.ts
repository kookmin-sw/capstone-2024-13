import { User } from '@/type';
import { postFetcher } from './api';

export const postFindUserById = async (_id: string): Promise<User> => {
	return await postFetcher<User>('/user/find', { filter: { _id } }).catch((error: Error) => {
		throw error;
	});
};
