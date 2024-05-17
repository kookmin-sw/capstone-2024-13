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
import * as Dto from '../../common/dto';
import AlbumService from '../album/album.service';
import { DeleteResult } from 'mongodb';

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
			return await this.diaryService.find({
				filter: { userId: req.user._id },
				options: { sort: { createdAt: -1 } },
			});
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
		@Body() createRequestDto: Dto.Request.Create<any>,
	): Promise<DiaryDocument> {
		try {
			const userId = req.user._id;
			const recents = await this.albumService
				.find({
					filter: { userId, title: 'Recents' },
					options: { limit: 1 },
				})
				.then(albums => albums[0]);
			createRequestDto.doc = { userId, albumId: [recents._id], ...createRequestDto.doc };
			const diary = await this.diaryService.create(
				createRequestDto as Dto.Request.Create<DiaryDocument>,
			);
			await this.albumService.findByIdAndUpdate({
				id: recents._id,
				update: {
					thumbnail: diary.images[0],
					$inc: { count: 1 },
				},
			});

			return diary;
		} catch (error) {
			throw new BadRequestException(`다이어리 생성 실패: ${error.status}: ${error.message}`);
		}
	}

	@Post('find')
	@ApiOperation({ summary: 'Find diary', description: 'Find diary' })
	@ApiOkResponse({ description: 'Find diary successfully', type: [Diary] })
	@ApiBadRequestResponse({ description: 'Failed to find diary' })
	async find(@Body() findRequestDto: Dto.Request.Find<Diary>): Promise<DiaryDocument[]> {
		try {
			return await this.diaryService.find(findRequestDto);
		} catch (error) {
			throw new BadRequestException(`Failed to find diary: ${error.status}: ${error.message}`);
		}
	}

	@Post('aggregate')
	@ApiOperation({ summary: 'Aggregate diary', description: 'Aggregate diary' })
	@ApiOkResponse({ description: 'Aggregate diary successfully', type: [Diary] })
	@ApiBadRequestResponse({ description: 'Failed to aggregate diary' })
	async aggregate(@Body() aggregateRequestDto: any): Promise<DiaryDocument[]> {
		try {
			return await this.diaryService.aggregate(aggregateRequestDto);
		} catch (error) {
			throw new BadRequestException(
				`Failed to get random diary: ${error.status}: ${error.message}`,
			);
		}
	}

	// Get diary by id
	@Get(':id')
	@ApiOperation({ summary: 'Find diary by id', description: 'Find diary by id' })
	@ApiOkResponse({ description: 'Find diary by id successfully', type: Diary })
	@ApiBadRequestResponse({ description: 'Failed to find diary by id' })
	async findById(@Param('id') id: string): Promise<DiaryDocument> {
		try {
			return await this.diaryService.findById({ id });
		} catch (error) {
			throw new BadRequestException(`Get diary failed: ${error.status}: ${error.message}`);
		}
	}

	// update diary
	@Patch(':id')
	@ApiOperation({ summary: 'Update diary', description: 'Update diary' })
	@ApiOkResponse({ description: 'Update diary successfully', type: Diary })
	@ApiBadRequestResponse({ description: 'Failed to update diary' })
	async findByIdAndUpdate(
		@Param('id') id: string,
		@Body() findByIdAndUpdateRequestDto: Dto.Request.FindByIdAndUpdate<Diary>,
	): Promise<DiaryDocument> {
		try {
			findByIdAndUpdateRequestDto.id = id;
			return await this.diaryService.findByIdAndUpdate(findByIdAndUpdateRequestDto);
		} catch (error) {
			throw new BadRequestException(`다이어리 수정 실패: ${error.status}: ${error.message}`);
		}
	}

	// delete diary
	@Delete(':id')
	@ApiOperation({ summary: 'Delete diary', description: 'Delete diary' })
	@ApiOkResponse({ description: 'Delete diary successfully', type: Diary })
	@ApiBadRequestResponse({ description: 'Failed to delete diary' })
	async deleteOne(@Param('id') _id: string, @Request() req): Promise<DeleteResult> {
		try {
			// Check if the diary exists and the user is authorized to delete it
			const diary = await this.diaryService.findById({ id: _id });

			if (!diary || diary.userId !== req.user._id) {
				throw new BadRequestException('You are not authorized to delete this diary.');
			}
			return await this.diaryService.deleteOne({ filter: { _id } });
		} catch (error) {
			throw new BadRequestException(`다이어리 삭제 실패: ${error.status}: ${error.message}`);
		}
	}
}

export default DiaryController;
