import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiarySchema } from 'src/common/database/schema';
import AlbumService from './album.service';
import AlbumController from './album.controller';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Diary', schema: DiarySchema }])],
	controllers: [AlbumController],
	providers: [AlbumService],
	exports: [AlbumService],
})
class AlbumModule {}

export default AlbumModule;
