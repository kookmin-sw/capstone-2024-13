import { BadRequestException, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common';
import DiaryService from './diary.service';
import { Diary } from 'src/common/database/schema';

@Controller('diary')
@ApiTags('diary')
@UseGuards(Auth.Guard.UserJwt)
class DiaryController {
	constructor(private readonly diaryService: DiaryService) {}

	@Get()
	@ApiOperation({ summary: 'Get user diaries', description: 'Get user diaries' })
	@ApiOkResponse({ type: [Diary] })
	async get(@Request() req) {
		try {
			const user = req.user;

			const diaries = [];
			for (const diaryId of user.diaries) {
				const diary = await this.diaryService.get(diaryId);

				if (diary) {
					diaries.push(diary);
				}
			}

			return diaries;
		} catch (error) {
			throw new BadRequestException(`Get user diary failed: ${error.status}: ${error.message}`);
		}
	}
}

export default DiaryController;
