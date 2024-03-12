import { Module } from '@nestjs/common';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import DiaryModule from './diary/diary.module';
import TestModule from './test/test.module';

@Module({
	imports: [AuthModule, UserModule, DiaryModule, TestModule],
})
class ApiModule {}

export default ApiModule;
