import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from 'src/common/database/schema/album.schema';
import { Types } from 'mongoose';
import DiaryService from 'src/api/diary/diary.service';

@Injectable()
class AlbumService {
<<<<<<< HEAD
	constructor(
		@InjectModel('Album') private readonly albumModel,
		private readonly diaryService: DiaryService,
	) {}
=======
	constructor(@InjectModel('Album') private readonly albumModel: any) {}
>>>>>>> main

	async find(query: any): Promise<Album[]> {
		try {
			return await this.albumModel.find(query);
		} catch (error) {
			throw error;
		}
	}

	async create(userId: Types.ObjectId, title: string) {
		try {
			return await new this.albumModel({ userId, title }).save();
		} catch (error) {
			throw error;
		}
	}

	async update(albumId: string, updatedFields: Record<string, any>) {
		try {
			return await this.albumModel.findByIdAndUpdate(albumId, updatedFields, { new: true });
		} catch (error) {
			throw error;
		}
	}

	async delete(albumId: string) {
		try {
			await this.diaryService.updateMany({ albumId: albumId }, { albumId: null });
			return await this.albumModel.findByIdAndDelete(albumId);
		} catch (error) {
			throw error;
		}
	}

	async addDiary(albumId: string, diaryId: string) {
		try {
			return await this.diaryService.update(diaryId, { albumId }, { new: true });
		} catch (error) {
			throw error;
		}
	}
}

export { AlbumService as default };
