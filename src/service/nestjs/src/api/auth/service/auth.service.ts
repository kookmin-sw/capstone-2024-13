import { Injectable } from '@nestjs/common';
import UserService from 'src/api/user/user.service';
import { UserDocument } from 'src/common/database/schema';

@Injectable()
class AuthService {
	constructor(private readonly userService: UserService) {}

	async login(email: string): Promise<UserDocument> {
		try {
			return await this.userService.findOne({ email });
		} catch (error) {
			throw error;
		}
	}

	async register(email: string, nickname: string): Promise<UserDocument> {
		try {
			return await this.userService.create(email, nickname);
		} catch (error) {
			throw error;
		}
	}
}

export default AuthService;
