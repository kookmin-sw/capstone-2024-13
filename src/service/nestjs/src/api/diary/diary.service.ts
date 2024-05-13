import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DiaryDocument } from 'src/common/database/schema';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DeleteResult } from 'mongodb';
import * as Dto from '../../common/dto';

@Injectable()
class DiaryService {
	constructor(@InjectModel('Diary') private readonly diaryModel: Model<DiaryDocument>) {}

	async findById(findByIdRequestDto: Dto.Request.FindById<DiaryDocument>): Promise<DiaryDocument> {
		try {
			const { id, projection, options } = findByIdRequestDto;

			return await this.diaryModel.findById(id, projection, options);
		} catch (error) {
			throw error;
		}
	}

	async find(findRequestDto: Dto.Request.Find<DiaryDocument>): Promise<DiaryDocument[]> {
		try {
			const { filter, projection, options } = findRequestDto;

			return await this.diaryModel.find(filter, projection, options);
		} catch (error) {
			throw error;
		}
	}

	async create(createRequestDto: Dto.Request.Create<DiaryDocument>): Promise<DiaryDocument> {
		try {
			const { doc, fields, options } = createRequestDto;

			return await new this.diaryModel(doc, fields, options).save();
		} catch (error) {
			throw error;
		}
	}

	async findByIdAndUpdate(
		findByIdAndUpdateRequestDto: Dto.Request.FindByIdAndUpdate<DiaryDocument>,
	): Promise<DiaryDocument> {
		try {
			const { id, update, options } = findByIdAndUpdateRequestDto;

			return await this.diaryModel.findByIdAndUpdate(id, update, options);
		} catch (error) {
			throw error;
		}
	}

	async findByIdAndDelete(id: string): Promise<DiaryDocument> {
		try {
			return await this.diaryModel.findByIdAndDelete(id);
		} catch (error) {
			throw error;
		}
	}

	async deleteOne(deleteRequestDto: Dto.Request.DeleteOne<DiaryDocument>): Promise<DeleteResult> {
		try {
			const { filter, options } = deleteRequestDto;

			return await this.diaryModel.deleteOne(filter, options);
		} catch (error) {
			throw error;
		}
	}

	async updateMany(
		updateManyRequestDto: Dto.Request.UpdateMany<DiaryDocument>,
	): Promise<UpdateWriteOpResult> {
		try {
			const { filter, update, options } = updateManyRequestDto;

			return await this.diaryModel.updateMany(filter, update, options);
		} catch (error) {
			throw error;
		}
	}

	async aggregate(aggregateRequestDto: Dto.Request.Aggregate): Promise<DiaryDocument[]> {
		try {
			const { pipeline, options } = aggregateRequestDto;

			return await this.diaryModel.aggregate(pipeline, options);
		} catch (error) {
			throw error;
		}
	}
}

export default DiaryService;
