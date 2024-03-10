import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import UserService from './user.service';
import { Auth } from 'src/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
@UseGuards(Auth.Guard.UserJwt)
class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@ApiProperty({ description: 'Get user info' })
	async me(@Request() req) {
		return req.user;
	}
}

export default UserController;
