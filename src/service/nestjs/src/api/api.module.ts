import { Module } from '@nestjs/common';
import AuthModule from './auth/auth.module';
import DiaryModule from './diary/diary.module';
import ImageModule from './image/image.module';
import TestModule from './test/test.module';
import UserModule from './user/user.module';

@Module({
	imports: [AuthModule, UserModule, DiaryModule, TestModule, ImageModule],
})
class ApiModule {}

export default ApiModule;
