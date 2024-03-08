import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/database/schema';

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

	async findByEmail(email: string): Promise<User> {
		try {
			return await this.userModel.findOne({ email });
		} catch (error) {
			throw error;
		}
	}
}

export default UserService;
