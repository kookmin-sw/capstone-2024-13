import { BadRequestException, Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common';
import { Types } from 'mongoose';
import MysticService from './mystic.service';
import * as Dto from './dto';

@Controller('mystic')
@ApiTags('mystic')
@UseGuards(Auth.Guard.UserJwt)
class MysticController {
	constructor(private readonly mysticService: MysticService) {}

	@Post('connect/:version')
	@ApiOperation({ summary: 'Connect', description: 'Connect to mystic' })
	@ApiOkResponse({ description: 'Connected successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async connect(
		@Param('version') version: string,
		@Body() connectRequestDto: Dto.Request.Connect,
	): Promise<Types.ObjectId> {
		try {
			return await this.mysticService.connect(version, connectRequestDto.templateId);
		} catch (error) {
			throw new BadRequestException(`Failed to connect mystic: ${error.status}: ${error.message}`);
		}
	}

	@Post('disconnect')
	@ApiOperation({ summary: 'Disconnect', description: 'Disconnect	from mystic' })
	@ApiOkResponse({ description: 'Disconnected successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async disconnect(@Body() disconnectRequestDto: Dto.Request.Disconnect): Promise<any> {
		try {
			return await this.mysticService.disconnect(disconnectRequestDto.connectionId);
		} catch (error) {
			throw new BadRequestException(
				`Failed to disconnect mystic: ${error.status}: ${error.message}`,
			);
		}
	}

	@Post('/chat/invoke/:version')
	@ApiOperation({ summary: 'Invoke', description: 'Invoke chat service' })
	@ApiOkResponse({ description: 'Invoked successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async invoke(
		@Param('version') version: string,
		@Body() invokeRequestDto: Dto.Request.Invoke,
	): Promise<any> {
		try {
			return await this.mysticService.invoke(
				version,
				invokeRequestDto.connectionId,
				invokeRequestDto.content,
			);
		} catch (error) {
			throw new BadRequestException(
				`Failed to invoke chat service: ${error.status}: ${error.message}`,
			);
		}
	}
}

export default MysticController;
