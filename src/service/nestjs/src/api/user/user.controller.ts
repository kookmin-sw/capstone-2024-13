import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import UserService from './user.service';
import { Auth } from 'src/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User, UserDocument } from 'src/common/database/schema';
import * as Dto from '../../common/dto';

@Controller('user')
@ApiTags('user')
@UseGuards(Auth.Guard.UserJwt)
class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@ApiOperation({ summary: 'Get my information', description: 'Get my information' })
	@ApiOkResponse({ type: User })
	async me(@Req() req): Promise<UserDocument> {
		return req.user;
	}

	@Patch('me')
	@ApiOperation({ summary: 'Update my information', description: 'Update my information' })
	@ApiOkResponse({ type: User })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async updateMe(@Req() req, @Body() findByIdAndUpdateRequestDto: any): Promise<UserDocument> {
		try {
			return await this.userService.findByIdAndUpdate({
				id: req.user._id,
				...findByIdAndUpdateRequestDto,
			});
		} catch (error) {
			throw error;
		}
	}

	@Post('find')
	@ApiOperation({ summary: 'Find user', description: 'Find user' })
	@ApiOkResponse({ type: User })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async find(@Body() findRequestDto: Dto.Request.Find<UserDocument>): Promise<UserDocument> {
		try {
			return await this.userService.find(findRequestDto).then(users => users[0]);
		} catch (error) {
			throw error;
		}
	}
}

export default UserController;
