import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiarySchema } from 'src/common/database/schema';
import DiaryController from './diary.controller';
import DiaryService from './diary.service';
import AlbumModule from '../album/album.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Diary', schema: DiarySchema }]),
		forwardRef(() => AlbumModule),
	],
	controllers: [DiaryController],
	providers: [DiaryService],
	exports: [DiaryService],
})
class DiaryModule {}

export default DiaryModule;
