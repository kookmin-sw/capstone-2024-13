import { postPresignedUrl } from '@/app/_service';
import { patchFetcher, postFetcher } from './api';

export const postRegister = async <Me>(query: object) => {
	const { file, ...rest } = query as { file?: File; [key: string]: any };

	let user = await postFetcher<Me>('/auth/register', rest).catch((error: any) => {
		throw error;
	});

	if (file) {
		const presignedUrl = await postPresignedUrl('profile').catch(error => {
			throw error;
		});
		const profileImageId = presignedUrl.fields.key.split('/')[2];
		user = await patchFetcher<Me>('/user/me', { profileImageId }).catch((error: any) => {
			throw error;
		});
		const formData = new FormData();

		for (const key in presignedUrl.fields) {
			formData.append(key, presignedUrl.fields[key]);
		}
		formData.append('Content-Type', file.type);
		formData.append('file', file);
		await postFetcher(presignedUrl.url, formData).catch((error: any) => {
			throw error;
		});
	} else {
		const profileImageId = `default-image-0${Math.floor(Math.random() * 10)}`;
		user = await patchFetcher<Me>('/user/me', { profileImageId }).catch((error: any) => {
			throw error;
		});
	}

	return user;
};
