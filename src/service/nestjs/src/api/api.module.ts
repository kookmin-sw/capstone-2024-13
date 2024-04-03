import { Module } from '@nestjs/common';
import AuthModule from './auth/auth.module';
import DiaryModule from './diary/diary.module';
import ImageModule from './image/image.module';
import MysticModule from './mystic/mystic.module';
import TestModule from './test/test.module';
import UserModule from './user/user.module';
import AlbumModule from './album/album.module';

@Module({
	imports: [
		AuthModule,
		AlbumModule,
		DiaryModule,
		ImageModule,
		MysticModule,
		TestModule,
		UserModule,
	],
})
class ApiModule {}

export default ApiModule;
