import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Diary, DiaryDocument } from 'src/common/database/schema';
import { Model, Types } from 'mongoose';
import * as Dto from './dto';

@Injectable()
class DiaryService {
	constructor(@InjectModel('Diary') private readonly diaryModel: Model<Diary>) {}

	async findById(diaryId: string): Promise<DiaryDocument> {
		try {
			return await this.diaryModel.findById(diaryId);
		} catch (error) {
			throw error;
		}
	}

	async find(query: Dto.Request.Find): Promise<DiaryDocument[]> {
		try {
			return await this.diaryModel.find(query);
		} catch (error) {
			throw error;
		}
	}

	async create(
		userId: Types.ObjectId,
		createRequestDto: Dto.Request.Create,
	): Promise<DiaryDocument> {
		try {
			return await new this.diaryModel({ userId, ...createRequestDto }).save();
		} catch (error) {
			throw error;
		}
	}

	async update(diaryId: string, updateRequestDto: Dto.Request.Update): Promise<DiaryDocument> {
		try {
			return await this.diaryModel.findByIdAndUpdate(
				diaryId,
				{ ...updateRequestDto },
				{ new: true },
			);
		} catch (error) {
			throw error;
		}
	}

	async delete(diaryId: string): Promise<DiaryDocument> {
		try {
			return await this.diaryModel.findByIdAndDelete(diaryId);
		} catch (error) {
			throw error;
		}
	}

	async updateMany(query: object, updateRequestDto: Dto.Request.Update): Promise<any> {
		try {
			return await this.diaryModel.updateMany(query, updateRequestDto, { new: true });
		} catch (error) {
			throw error;
		}
	}
}

export default DiaryService;
