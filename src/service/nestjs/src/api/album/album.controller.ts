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
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common';
import AlbumService from './album.service';
import { Album, AlbumDocument } from 'src/common/database/schema';
import * as Dto from 'src/api/album/dto';

@Controller('album')
@ApiTags('album')
@UseGuards(Auth.Guard.UserJwt)
class AlbumController {
	constructor(private readonly albumService: AlbumService) {}

	// Get user albums by One-to-Squillions relationship
	@Get()
	@ApiOperation({
		summary: 'Get user albums by One-to-Squillions relationship',
		description: 'Get user albums by One-to-Squillions relationship',
	})
	@ApiOkResponse({ description: "Get user's albums successfully", type: [Album] })
	@ApiBadRequestResponse({ description: 'Failed to get user album' })
	async getByUserId(@Request() req: any): Promise<AlbumDocument[]> {
		try {
			return await this.albumService.find({ userId: req.user._id });
		} catch (error) {
			throw new BadRequestException(`Failed to get user album: ${error.status}: ${error.message}`);
		}
	}

	// Create album
	@Post()
	@ApiOperation({ summary: '앨범 생성', description: '앨범 생성' })
	@ApiOkResponse({ description: 'Create album successfully', type: Album })
	@ApiBadRequestResponse({ description: 'Failed to create album' })
	async create(
		@Request() req,
		@Body() createRequestDto: Dto.Request.CreateAlbumDto,
	): Promise<AlbumDocument> {
		try {
			return await this.albumService.create(req.user._id, createRequestDto);
		} catch (error) {
			throw new BadRequestException(`Failed to create album: ${error.status}: ${error.message}`);
		}
	}

	// Get album by id
	@Get(':id')
	@ApiOperation({ summary: 'Get album by id', description: 'Get album by id' })
	@ApiOkResponse({ description: 'Get album successfully', type: Album })
	@ApiBadRequestResponse({ description: 'Failed to get album' })
	async get(@Param('id') albumId: string): Promise<AlbumDocument> {
		try {
			return await this.albumService.findById(albumId);
		} catch (error) {
			throw new BadRequestException(`Failed to get album: ${error.status}: ${error.message}`);
		}
	}

	// Update album
	@Patch(':id')
	@ApiOperation({ summary: '앨범 수정', description: '앨범 수정' })
	@ApiOkResponse({ type: Album })
	async update(
		@Param('id') albumId: string,
		@Body() updateRequestDto: Dto.Request.UpdateAlbumDto,
	): Promise<AlbumDocument> {
		try {
			return await this.albumService.update(albumId, updateRequestDto);
		} catch (error) {
			throw new BadRequestException(`Update album failed: ${error.status}: ${error.message}`);
		}
	}

	//delete album and update diaries albumId to null
	@Delete(':id')
	@ApiOperation({ summary: '앨범 삭제', description: '앨범 삭제' })
	@ApiOkResponse({ type: Album })
	async delete(@Param('id') albumId: string): Promise<AlbumDocument> {
		try {
			return await this.albumService.delete(albumId);
		} catch (error) {
			throw new BadRequestException(`Delete album failed: ${error.status}: ${error.message}`);
		}
	}

	// find album
	@Post('find')
	@ApiOperation({ summary: '앨범 검색', description: '앨범 검색' })
	@ApiOkResponse({ type: Album })
	async find(@Body() findAlbumDto: Dto.Request.FindAlbumDto): Promise<AlbumDocument[]> {
		try {
			return await this.albumService.find(findAlbumDto);
		} catch (error) {
			throw new BadRequestException(`Find album failed: ${error.status}: ${error.message}`);
		}
	}
}

export default AlbumController;
