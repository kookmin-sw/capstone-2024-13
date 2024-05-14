import { Me } from '@/type';
import { patchFetcher } from './api';
import { postUploadImage } from './postUploadImage';
import { AxiosError } from 'axios';

export const patchProfileImage = async (file: File): Promise<Me> => {
	const profileImageId = await postUploadImage('profile', file).catch((error: AxiosError) => {
		throw error;
	});

	return await patchFetcher<Me>('/user/me', {
		update: { profileImageId },
		options: { new: true },
	}).catch((error: Error) => {
		throw error;
	});
};
