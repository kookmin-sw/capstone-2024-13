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
import { Album } from 'src/common/database/schema';
import * as Dto from 'src/api/album/dto';

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
	async getUser(@Request() req: any) {
		try {
			const userId = req.user._id;

			return await this.albumService.find({ userId: userId });
		} catch (error) {
			throw new BadRequestException(`Get user album failed: ${error.status}: ${error.message}`);
		}
	}

	// Create album
	@Post()
	@ApiOperation({ summary: '앨범 생성', description: '앨범 생성' })
	@ApiOkResponse({ type: Album })
	async create(@Request() req, @Body() createAlbumDto: Dto.Request.CreateAlbumDto) {
		try {
			const userId = req.user._id;
			return await this.albumService.create(userId, createAlbumDto);
		} catch (error) {
			throw new BadRequestException(`Create album failed: ${error.status}: ${error.message}`);
		}
	}

	// find album
	@Post('find')
	@ApiOperation({ summary: '앨범 검색', description: '앨범 검색' })
	@ApiOkResponse({ type: Album })
	async find(@Body() findAlbumDto: Dto.Request.FindAlbumDto) {
		try {
			return await this.albumService.find(findAlbumDto);
		} catch (error) {
			throw new BadRequestException(`Find album failed: ${error.status}: ${error.message}`);
		}
	}

	// Update album
	@Patch(':id')
	@ApiOperation({ summary: '앨범 수정', description: '앨범 수정' })
	@ApiOkResponse({ type: Album })
	async update(@Param('id') albumId: string, @Body() createAlbumDto: Dto.Request.CreateAlbumDto) {
		try {
			const { title } = createAlbumDto;

			return await this.albumService.update(albumId, { title });
		} catch (error) {
			throw new BadRequestException(`Update album failed: ${error.status}: ${error.message}`);
		}
	}

	//delete album and update diaries albumId to null
	@Delete(':id')
	@ApiOperation({ summary: '앨범 삭제', description: '앨범 삭제' })
	@ApiOkResponse({ type: Album })
	async delete(@Param('id') albumId: string) {
		try {
			return await this.albumService.delete(albumId);
		} catch (error) {
			throw new BadRequestException(`Delete album failed: ${error.status}: ${error.message}`);
		}
	}
}

export default AlbumController;
