import { Me } from '@/type';
import { postFetcher } from './api';
import { AnyObject } from 'mongoose';
import { postPresignedUrl } from './postPresignedUrl';
import { patchMe } from './patchMe';

export const postRegister = async (
	doc?: Partial<Me>,
	fields?: any | null,
	options?: boolean | AnyObject,
	file?: File | null,
): Promise<Me> => {
	let user = await postFetcher<Me>('/auth/register', { doc, fields, options }).catch(
		(error: Error) => {
			throw error;
		},
	);

	if (file) {
		const presignedUrl = await postPresignedUrl('profile').catch(error => {
			throw error;
		});
		const profileImageId = presignedUrl.fields.key.split('/')[2];
		user = await patchMe({ profileImageId }).catch((error: Error) => {
			throw error;
		});
		const formData = new FormData();

		for (const key in presignedUrl.fields) {
			formData.append(key, presignedUrl.fields[key]);
		}
		formData.append('Content-Type', file.type);
		formData.append('file', file);
		await postFetcher(presignedUrl.url, formData).catch((error: Error) => {});
	} else {
		const profileImageId = `/image/default-image-0${Math.floor(Math.random() * 10)}.png`;
		user = await patchMe({ profileImageId }).catch((error: Error) => {
			throw error;
		});
	}

	return user;
};
