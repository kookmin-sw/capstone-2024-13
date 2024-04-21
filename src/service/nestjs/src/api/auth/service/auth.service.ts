import { Injectable } from '@nestjs/common';
import UserService from 'src/api/user/user.service';
import { UserDocument } from 'src/common/database/schema';
import * as Dto from '../../../common/dto';

@Injectable()
class AuthService {
	constructor(private readonly userService: UserService) {}

	async login(email: string): Promise<UserDocument> {
		try {
			return await this.userService
				.find({ filter: { email }, options: { limit: 1 } })
				.then(users => users[0]);
		} catch (error) {
			throw error;
		}
	}

	async register(createRequestDto: Dto.Request.Create<UserDocument>): Promise<UserDocument> {
		try {
			return await this.userService.create(createRequestDto);
		} catch (error) {
			throw error;
		}
	}
}

export default AuthService;
