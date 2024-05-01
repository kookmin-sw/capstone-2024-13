import { Me } from '@/type';
import { patchFetcher, postFetcher } from './api';
import { AnyObject } from 'mongoose';
import { patchProfileImage } from './patchProfileImage';

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
		user = await patchProfileImage(file).catch((error: Error) => {
			throw error;
		});
	} else {
		user = await patchFetcher<Me>('/user/me', {
			update: { profileImageId: `/image/default-image-0${Math.floor(Math.random() * 10)}.png` },
			options: { new: true },
		}).catch((error: Error) => {
			throw error;
		});
	}

	return user;
};
