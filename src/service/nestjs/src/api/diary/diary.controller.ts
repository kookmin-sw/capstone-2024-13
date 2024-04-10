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
	Inject,
	forwardRef,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common';
import DiaryService from './diary.service';
import { Diary, DiaryDocument } from 'src/common/database/schema';
import * as Dto from './dto';
import AlbumService from '../album/album.service';

@Controller('diary')
@ApiTags('diary')
@UseGuards(Auth.Guard.UserJwt)
class DiaryController {
	constructor(
		private readonly diaryService: DiaryService,
		@Inject(forwardRef(() => AlbumService))
		private readonly albumService: AlbumService,
	) {}

	// Get user diaries by One-to-Squillions relationship
	@Get()
	@ApiOperation({
		summary: 'Get user diaries by One-to-Squillions relationship',
		description: 'Get user diaries by One-to-Squillions relationship',
	})
	@ApiOkResponse({
		description: 'Get user diaries by One-to-Squillions relationship successfully',
		type: [Diary],
	})
	@ApiBadRequestResponse({
		description: 'Failed to get user diaries by One-to-Squillions relationship',
	})
	async getByUserId(@Request() req: any): Promise<DiaryDocument[]> {
		try {
			return await this.diaryService.find({ userId: req.user._id });
		} catch (error) {
			throw new BadRequestException(`Get user diary failed: ${error.status}: ${error.message}`);
		}
	}

	// Create diary
	@Post()
	@ApiOperation({ summary: 'Create diary', description: 'Create diary' })
	@ApiOkResponse({ description: 'Create diary successfully', type: Diary })
	@ApiBadRequestResponse({ description: 'Failed to create diary' })
	async create(
		@Request() req: any,
		@Body() createRequestDto: Dto.Request.Create,
	): Promise<DiaryDocument> {
		try {
			const recents = await this.albumService
				.find({ userId: req.user._id, title: 'Recents' })
				.then(albums => {
					return albums[0];
				});
			const diary = await this.diaryService.create(req.user._id, {
				...createRequestDto,
				albumId: recents._id.toString(),
			});
			await this.albumService.update(recents._id, {
				thumbnail: diary.images[0],
				$inc: { count: 1 },
			});

			return diary;
		} catch (error) {
			throw new BadRequestException(`다이어리 생성 실패: ${error.status}: ${error.message}`);
		}
	}

	// Get diary by id
	@Get(':id')
	@ApiOperation({ summary: 'Find diary by id', description: 'Find diary by id' })
	@ApiOkResponse({ description: 'Find diary by id successfully', type: Diary })
	@ApiBadRequestResponse({ description: 'Failed to find diary by id' })
	async findById(@Param('id') diaryId: string): Promise<DiaryDocument> {
		try {
			return await this.diaryService.findById(diaryId);
		} catch (error) {
			throw new BadRequestException(`Get diary failed: ${error.status}: ${error.message}`);
		}
	}

	// update diary
	@Patch(':id')
	@ApiOperation({ summary: 'Update diary', description: 'Update diary' })
	@ApiOkResponse({ description: 'Update diary successfully', type: Diary })
	@ApiBadRequestResponse({ description: 'Failed to update diary' })
	async update(
		@Param('id') diaryId: string,
		@Body() updateRequestDto: Dto.Request.Update,
	): Promise<DiaryDocument> {
		try {
			return await this.diaryService.update(diaryId, updateRequestDto);
		} catch (error) {
			throw new BadRequestException(`다이어리 수정 실패: ${error.status}: ${error.message}`);
		}
	}

	// delete diary
	@Delete(':id')
	@ApiOperation({ summary: 'Delete diary', description: 'Delete diary' })
	@ApiOkResponse({ description: 'Delete diary successfully', type: Diary })
	@ApiBadRequestResponse({ description: 'Failed to delete diary' })
	async delete(@Param('id') diaryId: string): Promise<DiaryDocument> {
		try {
			return await this.diaryService.delete(diaryId);
		} catch (error) {
			throw new BadRequestException(`다이어리 삭제 실패: ${error.status}: ${error.message}`);
		}
	}

	@Post('find')
	@ApiOperation({ summary: 'Find diaries', description: 'Find diaries' })
	@ApiOkResponse({ description: 'Find diaries successfully', type: [Diary] })
	@ApiBadRequestResponse({ description: 'Failed to find diaries' })
	async find(@Body() findRequestDto: Dto.Request.Find): Promise<DiaryDocument[]> {
		try {
			return await this.diaryService.find(findRequestDto);
		} catch (error) {
			throw new BadRequestException(`Failed to find diaries: ${error.status}: ${error.message}`);
		}
	}
}

export default DiaryController;
