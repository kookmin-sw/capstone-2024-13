import { Me } from '@/type';
import { postPresignedUrl } from './postPresignedUrl';
import { patchFetcher, postFetcher } from './api';

export const patchProfileImage = async (file: File): Promise<Me> => {
	const presignedUrl = await postPresignedUrl('profile').catch(error => {
		throw error;
	});
	const profileImageId = presignedUrl.fields.key.split('/')[2];
	const formData = new FormData();

	for (const key in presignedUrl.fields) {
		formData.append(key, presignedUrl.fields[key]);
	}
	formData.append('Content-Type', file.type);
	formData.append('file', file);
	await postFetcher<any>(presignedUrl.url, formData)
		.then((response: any) => {
			console.log(response);
		})
		.catch((error: Error) => {
			console.error(error);
		});

	return await patchFetcher<Me>('/user/me', {
		update: { profileImageId },
		options: { new: true },
	}).catch((error: Error) => {
		throw error;
	});
};
