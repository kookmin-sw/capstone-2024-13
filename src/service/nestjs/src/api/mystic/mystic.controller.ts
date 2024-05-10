import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common';
import MysticService from './mystic.service';
import * as Dto from './dto';

@Controller('mystic')
@ApiTags('mystic')
@UseGuards(Auth.Guard.UserJwt)
class MysticController {
	constructor(private readonly mysticService: MysticService) {}

	@Post('/connect')
	@ApiOperation({ summary: 'Connect', description: 'Connect to mystic' })
	@ApiOkResponse({ description: 'Connected successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async connect(@Body() connectRequestDto: Dto.Request.Connect): Promise<Dto.Response.Connect> {
		try {
			return await this.mysticService.connect(connectRequestDto);
		} catch (error) {
			throw new BadRequestException(`Failed to connect mystic: ${error.status}: ${error.message}`);
		}
	}

	@Post('/image/upload')
	@ApiOperation({ summary: 'Upload image', description: 'Upload image to mystic' })
	@ApiOkResponse({ description: 'Image uploaded successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async uploadImage(@Body() uploadImageRequestDto: Dto.Request.UploadImage): Promise<any> {
		try {
			return await this.mysticService.uploadImage(uploadImageRequestDto);
		} catch (error) {
			throw new BadRequestException(
				`Failed to upload image to mystic: ${error.status}: ${error.message}`,
			);
		}
	}

	@Post('/chat/invoke')
	@ApiOperation({ summary: 'Invoke', description: 'Invoke chat service' })
	@ApiOkResponse({ description: 'Invoked successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async invoke(@Body() invokeRequestDto: Dto.Request.Invoke): Promise<any> {
		try {
			return await this.mysticService.invoke(
				invokeRequestDto.connectionId,
				invokeRequestDto.content,
			);
		} catch (error) {
			throw new BadRequestException(
				`Failed to invoke chat service: ${error.status}: ${error.message}`,
			);
		}
	}

	@Post('/disconnect')
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
}

export default MysticController;
