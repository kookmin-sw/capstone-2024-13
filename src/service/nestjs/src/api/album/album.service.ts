import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AlbumDocument } from 'src/common/database/schema/album.schema';
import { Model } from 'mongoose';
import DiaryService from 'src/api/diary/diary.service';
import * as Dto from '../../common/dto';

@Injectable()
class AlbumService {
	constructor(
		@InjectModel('Album') private readonly albumModel: Model<AlbumDocument>,
		private readonly diaryService: DiaryService,
	) {}

	async find(findRequestDto: Dto.Request.Find<AlbumDocument>): Promise<AlbumDocument[]> {
		try {
			const { filter, projection, options } = findRequestDto;

			return await this.albumModel.find(filter, projection, options);
			//let albums = await this.albumModel.find(filter, projection, options);

			//albums = albums.sort((a: Album, b: Album) => {
			//	if (a.title === 'Recents') return -1;
			//	if (b.title === 'Recents') return 1;
			//	return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
			//});

			//return albums;
		} catch (error) {
			throw error;
		}
	}

	async findById(findByIdRequestDto: Dto.Request.FindById<AlbumDocument>): Promise<AlbumDocument> {
		try {
			const { id, projection, options } = findByIdRequestDto;

			return await this.albumModel.findById(id, projection, options);
		} catch (error) {
			throw error;
		}
	}

	async create(createRequestDto: Dto.Request.Create<AlbumDocument>): Promise<AlbumDocument> {
		try {
			const { doc, fields, options } = createRequestDto;

			return await new this.albumModel(doc, fields, options).save();
		} catch (error) {
			throw error;
		}
	}

	async findByIdAndUpdate(
		findByIdAndUpdateRequestDto: Dto.Request.FindByIdAndUpdate<AlbumDocument>,
	): Promise<AlbumDocument> {
		try {
			const { id, update, options } = findByIdAndUpdateRequestDto;

			return await this.albumModel.findByIdAndUpdate(id, update, options);
		} catch (error) {
			throw error;
		}
	}

	async findByIdAndDelete(id: string): Promise<AlbumDocument> {
		try {
			await this.diaryService.updateMany({ filter: { albumId: id }, update: { albumId: null } });

			return await this.albumModel.findByIdAndDelete(id);
		} catch (error) {
			throw error;
		}
	}
}

export { AlbumService as default };
