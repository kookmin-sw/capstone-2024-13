import { Album, Diary } from '@/type';
import { patchFetcher, postFetcher, deleteFetcher } from './api';

export const removeDiaryFromAlbum = async (albumId: string, diaryId: string): Promise<Album> => {
	let album = await patchFetcher<Album>(`/album/${albumId}`, {
		update: { $inc: { count: -1 } },
		options: { new: true },
	}).catch((error: Error) => {
		throw error;
	});

	let diary = await patchFetcher<Diary>(`/diary/${diaryId}`, {
		update: { $pull: { albumId } },
		options: { new: true },
	}).catch((error: Error) => {
		throw error;
	});

	if ((diary.albumId ?? []).length === 0) {
		await deleteFetcher(`/diary/${diaryId}`).catch((error: Error) => {
			throw error;
		});
	}

	if (diary.images && album.thumbnail === diary.images[0]) {
		diary = await postFetcher<Diary[]>('/diary/find', {
			filter: { albumId: { $in: [albumId] } },
			options: { limit: 1 },
		}).then(diaries => diaries[0]);

		album = await patchFetcher<Album>(`/album/${albumId}`, {
			update: { thumbnail: diary && diary.images ? diary.images[0] : '' },
			options: { new: true },
		}).catch((error: Error) => {
			throw error;
		});
	}

	return album;
};
