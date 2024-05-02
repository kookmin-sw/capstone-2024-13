import { Album, Diary } from '@/type';
import { deleteFetcher, getFetcher, patchFetcher, postFetcher } from './api';
import { DeleteResult } from 'mongodb';

export const deleteDiary = async (id: string): Promise<Album[]> => {
	const diary = await getFetcher<Diary>(`/diary/${id}`).catch((error: any) => {
		throw error;
	});
	const deleteResult = await deleteFetcher<DeleteResult>(`/diary/${id}`).catch((error: any) => {
		throw error;
	});
	const albums = await patchFetcher<Album[]>('/album/updateMany', {
		filter: { _id: { $in: diary.albumId } },
		update: { $inc: { count: -1 } },
		options: { multi: true, new: true },
	}).catch((error: any) => {
		throw error;
	});

	for (let idx = 0; idx < albums.length; idx++) {
		const album = albums[idx];

		if (!album.thumbnail || !diary.images || album.thumbnail !== diary.images[0]) {
			continue;
		}

		const lastDiary: Diary | null = await postFetcher<Diary[]>('/diary/find', {
			filter: { albumId: { $in: [album._id] } },
			options: { sort: { createdAt: -1 }, limit: 1 },
		})
			.then((diaries: Diary[]) => {
				return 0 < diaries.length ? diaries[0] : null;
			})
			.catch((error: any) => {
				throw error;
			});

		albums[idx] = await patchFetcher<Album>(`/album/${album._id}`, {
			update: { thumbnail: lastDiary && lastDiary.images ? lastDiary.images[0] : '' },
			options: { new: true },
		}).catch((error: any) => {
			throw error;
		});
	}

	return albums;
};
