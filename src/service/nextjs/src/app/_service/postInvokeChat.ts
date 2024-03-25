import { postFetcher } from './api';

const postInvokeChat = async (query: object): Promise<any> => {
	const { version, connectionId, content } = query as {
		version: string;
		connectionId: string;
		content: string;
	};

	return await postFetcher<any>(`/mystic/chat/invoke/${version}`, { connectionId, content })
		.then(response => {
			return response.content;
		})
		.catch(error => {
			throw error;
		});
};

export default postInvokeChat;
