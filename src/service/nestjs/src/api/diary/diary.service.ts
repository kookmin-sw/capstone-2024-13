import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Diary } from 'src/common/database/schema';
import { Types } from 'mongoose';
import * as Dto from './dto';

@Injectable()
class DiaryService {
	constructor(@InjectModel('Diary') private readonly diaryModel: any) {}

	async find(query: Dto.Request.Find): Promise<Diary[]> {
		try {
			return await this.diaryModel.find(query);
		} catch (error) {
			throw error;
		}
	}

	async create(userId: Types.ObjectId, title: string, content: string) {
		try {
			return await new this.diaryModel({ userId, title, content }).save();
		} catch (error) {
			throw error;
		}
	}

	async update(diaryId: string, title: string, content: string) {
		try {
			return await this.diaryModel.findByIdAndUpdate(diaryId, { title, content }, { new: true });
		} catch (error) {
			throw error;
		}
	}

	async delete(diaryId: string) {
		try {
			return await this.diaryModel.findByIdAndDelete(diaryId);
		} catch (error) {
			throw error;
		}
	}
}

export default DiaryService;
