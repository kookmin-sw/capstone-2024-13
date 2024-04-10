import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from 'src/common/database/schema/album.schema';
import { Types } from 'mongoose';
import DiaryService from 'src/api/diary/diary.service';
import * as Dto from './dto';

@Injectable()
class AlbumService {
	constructor(
		@InjectModel('Album') private readonly albumModel: any,
		private readonly diaryService: DiaryService,
	) {}

	async find(query: any): Promise<AlbumDocument[]> {
		try {
			let albums = await this.albumModel.find(query);

			albums = albums.sort((a: Album, b: Album) => {
				if (a.title === 'Recents') return -1;
				if (b.title === 'Recents') return 1;
				return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
			});

			return albums;
		} catch (error) {
			throw error;
		}
	}

	async findById(_id: string): Promise<AlbumDocument> {
		try {
			return await this.albumModel.findById({ _id });
		} catch (error) {
			throw error;
		}
	}

	async create(
		userId: Types.ObjectId,
		createRequestDto: Dto.Request.CreateAlbumDto,
	): Promise<AlbumDocument> {
		try {
			return await new this.albumModel({ userId, ...createRequestDto }).save();
		} catch (error) {
			throw error;
		}
	}

	async update(
		albumId: string,
		updateRequestDto: Dto.Request.UpdateAlbumDto,
	): Promise<AlbumDocument> {
		try {
			return await this.albumModel.findByIdAndUpdate(albumId, updateRequestDto, { new: true });
		} catch (error) {
			throw error;
		}
	}

	async delete(albumId: string): Promise<AlbumDocument> {
		try {
			await this.diaryService.updateMany({ albumId }, { albumId: null });

			return await this.albumModel.findByIdAndDelete(albumId);
		} catch (error) {
			throw error;
		}
	}
}

export { AlbumService as default };
