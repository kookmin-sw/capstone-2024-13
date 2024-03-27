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
import DiaryService from './diary.service';
import { Diary } from 'src/common/database/schema';
import { Types } from 'mongoose';
import * as Dto from './dto';
@Controller('diary')
@ApiTags('diary')
@UseGuards(Auth.Guard.UserJwt)
class DiaryController {
	constructor(private readonly diaryService: DiaryService) {}

	// Get diary by id
	@Get(':id')
	@ApiOperation({ summary: 'Get diary by id', description: 'Get diary by id' })
	@ApiOkResponse({ type: Diary })
	async get(@Param('id') diaryId: string) {
		try {
			return await this.diaryService.find({ _id: diaryId });
		} catch (error) {
			throw new BadRequestException(`Get diary failed: ${error.status}: ${error.message}`);
		}
	}

	// Get user diaries by One-to-Squillions relationship
	@Get()
	@ApiOperation({
		summary: 'Get user diaries by One-to-Squillions relationship',
		description: 'Get user diaries by One-to-Squillions relationship',
	})
	@ApiOkResponse({ type: [Diary] })
	async getUser(@Request() req) {
		try {
			const userId = req.user._id;

			return await this.diaryService.find({ userId: userId });
		} catch (error) {
			throw new BadRequestException(`Get user diary failed: ${error.status}: ${error.message}`);
		}
	}

	// Create diary
	@Post()
	@ApiOperation({ summary: '다이어리 생성', description: '다이어리 생성' })
	@ApiOkResponse({ type: Diary })
	async create(@Request() req, @Body() createDiaryDto: Dto.Request.Diary) {
		try {
			const userId = req.user._id;
			const { title, content } = createDiaryDto;

			return await this.diaryService.create(userId, title, content);
		} catch (error) {
			throw new BadRequestException(`다이어리 생성 실패: ${error.status}: ${error.message}`);
		}
	}

	// update diary
	@Patch(':id')
	@ApiOperation({ summary: '다이어리 수정', description: '다이어리 수정' })
	@ApiOkResponse({ type: Diary })
	async update(@Param('id') diaryId: string, @Body() createDiaryDto: Dto.Request.Diary) {
		try {
			const { title, content } = createDiaryDto;

			return await this.diaryService.update(diaryId, title, content);
		} catch (error) {
			throw new BadRequestException(`다이어리 수정 실패: ${error.status}: ${error.message}`);
		}
	}

	// delete diary
	@Delete(':id')
	@ApiOperation({ summary: '다이어리 삭제', description: '다이어리 삭제' })
	@ApiOkResponse({ type: Diary })
	async delete(@Param('id') diaryId: string) {
		try {
			return await this.diaryService.delete(diaryId);
		} catch (error) {
			throw new BadRequestException(`다이어리 삭제 실패: ${error.status}: ${error.message}`);
		}
	}
}

export default DiaryController;
