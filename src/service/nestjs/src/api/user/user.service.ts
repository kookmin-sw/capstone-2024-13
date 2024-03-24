import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/database/schema';
import * as Dto from './dto';

@Injectable()
class UserService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

	async create(email: string, nickname: string): Promise<User> {
		try {
			return await new this.userModel({ email, nickname }).save();
		} catch (error) {
			throw error;
		}
	}

	async findOne(query: Dto.Request.Find): Promise<User> {
		try {
			return await this.userModel.findOne(query);
		} catch (error) {
			throw error;
		}
	}

	async findOneAndUpdate(query: Dto.Request.Find, update: object): Promise<User> {
		try {
			return await this.userModel.findOneAndUpdate(query, update, { new: true });
		} catch (error) {
			throw error;
		}
	}
}

export default UserService;
