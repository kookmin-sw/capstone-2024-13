import { postFetcher } from './api';

const postPresignedUrl = async (path: string): Promise<any> =>
	postFetcher<any>('image/presigned', { path }).catch(error => {
		throw error;
	});

export default postPresignedUrl;
