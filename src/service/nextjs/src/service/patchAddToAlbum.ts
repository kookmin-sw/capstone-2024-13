import { Album, Diary } from '@/type';
import { patchFetcher } from './api';

export const patchAddToAlbum = async (diary: Diary, album: Album) => {
	if (!diary.albumId?.includes(album._id)) {
		return await patchFetcher<Diary>(`/diary/${diary._id}`, {
			update: { $push: { albumId: album._id } },
			options: { new: true },
		})
			.then(async (newDiary: Diary) => {
				return await patchFetcher<Album>(`/album/${album._id}`, {
					update: {
						$inc: { count: 1 },
						$set: { thumbnail: diary?.images ? diary.images[0] : '' },
					},
					options: { new: true },
				})
					.then((newAlbum: Album) => {
						return newAlbum;
					})
					.catch((error: Error) => {
						throw error;
					});
			})
			.catch((error: Error) => {
				throw error;
			});
	}

	return null;
};
