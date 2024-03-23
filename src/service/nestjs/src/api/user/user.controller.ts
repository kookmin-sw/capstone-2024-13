import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import UserService from './user.service';
import { Auth } from 'src/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/database/schema';
import * as Dto from './dto';

@Controller('user')
@ApiTags('user')
@UseGuards(Auth.Guard.UserJwt)
class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@ApiOperation({ summary: 'Get my information', description: 'Get my information' })
	@ApiOkResponse({ type: User })
	async me(@Req() req) {
		return req.user;
	}

	@Patch('me')
	@ApiOperation({ summary: 'Update my information', description: 'Update my information' })
	@ApiOkResponse({ type: User })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async updateMe(@Req() req, @Body() updateRequestDto: Dto.Request.Update) {
		try {
			return await this.userService.findOneAndUpdate({ _id: req.user._id }, updateRequestDto);
		} catch (error) {
			throw error;
		}
	}
}

export default UserController;
