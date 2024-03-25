import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Diary } from 'src/common/database/schema';

@Injectable()
class DiaryService {
	constructor(@InjectModel('Diary') private readonly diaryModel) {}

	async get(_id: string): Promise<Diary> {
		try {
			return await this.diaryModel.findOne({ _id });
		} catch (error) {
			throw error;
		}
	}
}

export default DiaryService;
