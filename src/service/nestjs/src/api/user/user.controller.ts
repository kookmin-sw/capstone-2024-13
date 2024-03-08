import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import UserService from './user.service';
import { Auth } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

@Controller('user')
class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@UseGuards(Auth.Guard.UserJwt)
	@ApiProperty({ description: 'Get user info' })
	async me(@Request() req) {
		return req.user;
	}
}

export default UserController;
