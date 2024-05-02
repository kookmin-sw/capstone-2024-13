import { Me } from '@/type';
import { postFetcher } from './api';

export const postLogout = async (): Promise<void> => {
	return await postFetcher<Me>('/auth/logout')
		.then(() => {
			// 로그아웃 후에 /auth/login으로 리다이렉트
			window.location.href = process.env.NEXT_PUBLIC_NEXTJS_URL + '/auth/login';
		})
		.catch((error: Error) => {
			throw error;
		});
};
