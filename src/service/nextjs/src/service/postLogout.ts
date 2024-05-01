import { Me } from '@/type';
import { postFetcher } from './api';

export const postLogout = async (): Promise<Me> => {
	return await postFetcher<Me>('/auth/logout').catch((error: Error) => {
		throw error;
	});
};
