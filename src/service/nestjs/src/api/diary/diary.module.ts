import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiarySchema } from 'src/common/database/schema';
import DiaryController from './diary.controller';
import DiaryService from './diary.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Diary', schema: DiarySchema }])],
	controllers: [DiaryController],
	providers: [DiaryService],
	exports: [DiaryService],
})
class DiaryModule {}

export default DiaryModule;
