import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Body,
	Post,
	Delete,
	Request,
	UseGuards,
	Patch,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common';
import AlbumService from './album.service';
import { Album } from 'src/common/database/schema/album.schema';
import { Types } from 'mongoose';
@Controller('album')
@ApiTags('album')
@UseGuards(Auth.Guard.UserJwt)
class AlbumController {
	constructor(private readonly albumService: AlbumService) {}

	// Get album by id
	@Get(':id')
	@ApiOperation({ summary: 'Get album by id', description: 'Get album by id' })
	@ApiOkResponse({ type: Album })
	async get(@Param('id') albumId: string) {
		try {
			return await this.albumService.find({ _id: albumId });
		} catch (error) {
			throw new BadRequestException(`Get album failed: ${error.status}: ${error.message}`);
		}
	}

	// Get user albums by One-to-Squillions relationship
	@Get()
	@ApiOperation({
		summary: 'Get user albums by One-to-Squillions relationship',
		description: 'Get user albums by One-to-Squillions relationship',
	})
	@ApiOkResponse({ type: [Album] })
	async getUser(@Request() req) {
		try {
			const userId = req.user._id;

			return await this.albumService.find({ userId: userId });
		} catch (error) {
			throw new BadRequestException(`Get user album failed: ${error.status}: ${error.message}`);
		}
	}
}

export default AlbumController;
