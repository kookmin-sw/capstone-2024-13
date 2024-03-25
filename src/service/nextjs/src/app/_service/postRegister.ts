import postPresignedUrl from './postPresignedUrl';
import { patchFetcher, postFetcher } from './api';

const postRegister = async <Me>(query: object) => {
	const { file, ...rest } = query as { file?: File; [key: string]: any };

	let user = await postFetcher<Me>('/auth/register', rest).catch(error => {
		throw error;
	});

	if (file) {
		const presignedUrl = await postPresignedUrl('profile').catch(error => {
			throw error;
		});
		const profileImageId = presignedUrl.fields.key.split('/')[2];
		user = await patchFetcher<Me>('/user/me', { profileImageId }).catch(error => {
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
