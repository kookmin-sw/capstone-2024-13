import { BadRequestException, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common';
import DiaryService from './diary.service';

@Controller('diary')
@ApiTags('diary')
@UseGuards(Auth.Guard.UserJwt)
class DiaryController {
	constructor(private readonly diaryService: DiaryService) {}

	@Get()
	@ApiProperty({ description: 'Get user diary' })
	async get(@Request() req) {
		try {
			const diaries = [];
			const user = req.user;
			for (const diaryId of user.diaries) {
				const diary = await this.diaryService.get(diaryId);
				diaries.push(diary);
			}

			return diaries;
		} catch (error) {
			throw new BadRequestException(`Get user diary failed: ${error.status}: ${error.message}`);
		}
	}
}

export default DiaryController;
