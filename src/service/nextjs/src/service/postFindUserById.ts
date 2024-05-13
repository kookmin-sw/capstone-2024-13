import { User } from '@/type';
import { postFetcher } from './api';

export const postFindUserById = async (_id: string): Promise<User> => {
	return await postFetcher<User[]>('/user/find', { filter: { _id } })
		.then((response: User[]) => {
			return response[0];
		})
		.catch((error: Error) => {
			throw error;
		});
};
