import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Injectable()
class DiaryService {
	constructor(@InjectModel('Diary') private readonly diaryModel) {}

	async get(_id: Types.ObjectId) {
		try {
			return await this.diaryModel.findOne({ _id });
		} catch (error) {
			throw error;
		}
	}
}

export default DiaryService;
