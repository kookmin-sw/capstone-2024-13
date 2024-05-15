import { AxiosError } from 'axios';
import { postPresignedUrl } from './postPresignedUrl';
import { postFetcher } from './api';

export const postUploadImage = async (path: string, file: File): Promise<string> => {
	const presignedUrl = await postPresignedUrl(path).catch((error: AxiosError) => {
		throw error;
	});
	const src = presignedUrl.fields.key.split('/')[2];
	const formData = new FormData();

	for (const key in presignedUrl.fields) {
		formData.append(key, presignedUrl.fields[key]);
	}
	formData.append('Content-Type', file.type);
	formData.append('file', file);

	await postFetcher<any>(presignedUrl.url, formData).catch((error: AxiosError) => {
		throw error;
	});

	return src;
};
