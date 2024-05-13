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
			const diaries = await this.diaryService.find({ filter: { albumId: { $in: [id] } } });

			for (const diary of diaries) {
				if (diary.albumId.length === 1) {
					await this.diaryService.findByIdAndDelete(diary._id);
					continue;
				} else {
					await this.diaryService.findByIdAndUpdate({
						id: diary._id,
						update: { $pull: { albumId: id } },
					});
				}
			}

			return await this.albumModel.findByIdAndDelete(id);
		} catch (error) {
			throw error;
		}
	}

	async updateMany(
		updateManyRequestDto: Dto.Request.UpdateMany<AlbumDocument>,
	): Promise<AlbumDocument[]> {
		try {
			const { filter, update, options } = updateManyRequestDto;
			const result = await this.albumModel.updateMany(filter, update, options);

			console.log(result);

			return await this.albumModel.find(filter);
		} catch (error) {
			throw error;
		}
	}
}

export { AlbumService as default };
