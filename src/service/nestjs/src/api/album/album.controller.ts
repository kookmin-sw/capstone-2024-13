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
import * as Dto from '../../common/dto';

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
			return await this.albumService.find({ filter: { userId: req.user._id } });
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
		@Body() createRequestDto: Dto.Request.Create<any>,
	): Promise<AlbumDocument> {
		try {
			createRequestDto.doc = { userId: req.user._id, ...createRequestDto.doc };
			return await this.albumService.create(createRequestDto as Dto.Request.Create<AlbumDocument>);
		} catch (error) {
			throw new BadRequestException(`Failed to create album: ${error.status}: ${error.message}`);
		}
	}

	// find album
	@Post('find')
	@ApiOperation({ summary: '앨범 검색', description: '앨범 검색' })
	@ApiOkResponse({ type: Album })
	async find(@Body() findRequestDto: Dto.Request.Find<AlbumDocument>): Promise<AlbumDocument[]> {
		try {
			return await this.albumService.find(findRequestDto);
		} catch (error) {
			throw new BadRequestException(`Find album failed: ${error.status}: ${error.message}`);
		}
	}

	@Patch('updateMany')
	@ApiOperation({ summary: '앨범 수정', description: '앨범 수정' })
	@ApiOkResponse({})
	async updateMany(
		@Body() updateManyRequestDto: Dto.Request.UpdateMany<AlbumDocument>,
	): Promise<AlbumDocument[]> {
		try {
			return await this.albumService.updateMany(updateManyRequestDto);
		} catch (error) {
			throw new BadRequestException(`Update album failed: ${error.status}: ${error.message}`);
		}
	}

	// Get album by id
	@Get(':id')
	@ApiOperation({ summary: 'Get album by id', description: 'Get album by id' })
	@ApiOkResponse({ description: 'Get album successfully', type: Album })
	@ApiBadRequestResponse({ description: 'Failed to get album' })
	async get(@Param('id') id: string): Promise<AlbumDocument> {
		try {
			return await this.albumService.findById({ id });
		} catch (error) {
			throw new BadRequestException(`Failed to get album: ${error.status}: ${error.message}`);
		}
	}

	// Update album
	@Patch(':id')
	@ApiOperation({ summary: '앨범 수정', description: '앨범 수정' })
	@ApiOkResponse({ type: Album })
	async update(
		@Param('id') id: string,
		@Body() findByIdAndUpdateRequestDto: Dto.Request.FindByIdAndUpdate<AlbumDocument>,
	): Promise<AlbumDocument> {
		try {
			findByIdAndUpdateRequestDto.id = id;
			return await this.albumService.findByIdAndUpdate(findByIdAndUpdateRequestDto);
		} catch (error) {
			throw new BadRequestException(`Update album failed: ${error.status}: ${error.message}`);
		}
	}

	//delete album and update diaries albumId to null
	@Delete(':id')
	@ApiOperation({ summary: '앨범 삭제', description: '앨범 삭제' })
	@ApiOkResponse({ type: Album })
	async delete(@Param('id') id: string): Promise<AlbumDocument> {
		try {
			return await this.albumService.findByIdAndDelete(id);
		} catch (error) {
			throw new BadRequestException(`Delete album failed: ${error.status}: ${error.message}`);
		}
	}
}

export default AlbumController;
