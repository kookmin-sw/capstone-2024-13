import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common';
import ImageService from './service/image.service';
import S3Service from './service/s3.service';
import * as Dto from './dto';
import UserService from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Controller('image')
@ApiTags('image')
@UseGuards(Auth.Guard.UserJwt)
class ImageController {
	constructor(
		private readonly imageService: ImageService,
		private readonly userService: UserService,
		private readonly s3Service: S3Service,
		private readonly configService: ConfigService,
	) {}

	@Post('presigned')
	@ApiOperation({ summary: 'Get presigned URL for image upload' })
	@ApiOkResponse({ description: 'Presigned URL' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getPresignedUrl(
		@Req() req: any,
		@Body() presignedRequestDto: Dto.Request.Presigned,
	): Promise<any> {
		try {
			const path = presignedRequestDto.path;
			const image = await this.imageService.create();
			const imageEndPoint = 'raw/' + path + '/' + image.toString();
			const presignedUrl = await this.s3Service.getPresignedUrl(imageEndPoint);

			return presignedUrl;
		} catch (error) {
			throw error;
		}
	}
}

export default ImageController;
