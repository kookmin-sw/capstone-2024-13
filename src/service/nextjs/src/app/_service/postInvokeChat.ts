import { postFetcher } from './api';

export const postInvokeChat = async (query: object): Promise<any> => {
	const { version, ...rest } = query as { version: string; [key: string]: any };

	return await postFetcher<any>(`/mystic/chat/invoke/${version}`, rest)
		.then((response: any) => {
			return response.content;
		})
		.catch((error: any) => {
			throw error;
		});
};
