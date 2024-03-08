import { Injectable } from '@nestjs/common';
import UserService from 'src/api/user/user.service';
import { User } from 'src/common/database/schema';

@Injectable()
class AuthService {
	constructor(private readonly userService: UserService) {}

	async login(email: string): Promise<User> {
		try {
			return await this.userService.findByEmail(email);
		} catch (error) {
			throw error;
		}
	}

	async register(email: string, nickname: string): Promise<User> {
		try {
			return await this.userService.create(email, nickname);
		} catch (error) {
			throw error;
		}
	}
}

export default AuthService;
