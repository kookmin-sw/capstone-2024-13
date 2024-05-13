import { User, Diary } from '@/type';
import { postFetcher } from './api';

export const postSearchDiary = async (content: string): Promise<Diary[]> => {
	const users = await postFetcher<User[]>('/user/find', {
		filter: {
			nickname: { $regex: content, $options: 'i' },
		},
	}).catch((error: Error) => {
		throw error;
	});

	return await postFetcher<Diary[]>('/diary/find', {
		filter: {
			isPublic: true,
			$or: [
				{ title: { $regex: content, $options: 'i' } },
				{ content: { $regex: content, $options: 'i' } },
				{ userId: { $in: users.map(user => user._id) } },
			],
		},
	}).catch((error: Error) => {
		throw error;
	});
};
