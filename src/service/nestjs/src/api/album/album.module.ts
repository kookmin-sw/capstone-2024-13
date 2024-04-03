import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AlbumService from './album.service';
import AlbumController from './album.controller';
import { AlbumSchema } from 'src/common/database/schema/album.schema';
import DiaryModule from '../diary/diary.module';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Album', schema: AlbumSchema }]), DiaryModule],
	controllers: [AlbumController],
	providers: [AlbumService],
	exports: [AlbumService],
})
class AlbumModule {}

export default AlbumModule;
