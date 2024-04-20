import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/common/database/schema';
import * as Dto from '../../common/dto';

@Injectable()
class UserService {
	constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

	async create(createRequestDto: Dto.Request.Create<UserDocument>): Promise<UserDocument> {
		try {
			const { doc, fields, options } = createRequestDto;

			return await new this.userModel(doc, fields, options).save();
		} catch (error) {
			throw error;
		}
	}

	async find(findRequestDto: Dto.Request.Find<UserDocument>): Promise<UserDocument[]> {
		try {
			const { filter, projection, options } = findRequestDto;

			return await this.userModel.find(filter, projection, options);
		} catch (error) {
			throw error;
		}
	}

	async findByIdAndUpdate(
		findByIdAndUpdateRequestDto: Dto.Request.FindByIdAndUpdate<UserDocument>,
	): Promise<UserDocument> {
		try {
			const { id, update, options } = findByIdAndUpdateRequestDto;

			return await this.userModel.findByIdAndUpdate(id, update, options);
		} catch (error) {
			throw error;
		}
	}
}

export default UserService;
