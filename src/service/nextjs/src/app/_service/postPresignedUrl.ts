import { postFetcher } from './api';

export const postPresignedUrl = async (path: string): Promise<any> =>
	postFetcher<any>('image/presigned', { path }).catch((error: any) => {
		throw error;
	});
