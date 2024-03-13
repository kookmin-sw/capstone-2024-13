import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import UserService from './user.service';
import { Auth } from 'src/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/database/schema';

@Controller('user')
@ApiTags('user')
@UseGuards(Auth.Guard.UserJwt)
class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@ApiOperation({ summary: 'Get my information', description: 'Get my information' })
	@ApiOkResponse({ type: User })
	async me(@Request() req) {
		return req.user;
	}
}

export default UserController;
