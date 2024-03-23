import { Dispatch, SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import postPresignedUrl from './postPresignedUrl';
import { getFetcher, patchFetcher, postFetcher } from './api';
import { Me } from '@/app/_type';

const postRegister = async <Me>(query: object) => {
	const { file, ...rest } = query as { file?: File; [key: string]: any };

	let user = await postFetcher<Me>('/auth/register', rest).catch(error => {
		throw error;
	});

	if (file) {
		const presignedUrl = await postPresignedUrl('profile').catch(error => {
			throw error;
		});
		const profileImageUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL + '/' + presignedUrl.fields.key;
		user = await patchFetcher<Me>('/user/me', { profileImageUrl }).catch(error => {
			throw error;
		});
		const formData = new FormData();

		for (const key in presignedUrl.fields) {
			formData.append(key, presignedUrl.fields[key]);
		}
		formData.append('Content-Type', file.type);
		formData.append('file', file);
		postFetcher(presignedUrl.url, formData).catch(error => {
			throw error;
		});
	}

	return user;
};

export default postRegister;
