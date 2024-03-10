import { Module } from '@nestjs/common';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import DiaryModule from './diary/diary.module';

@Module({
	imports: [AuthModule, UserModule, DiaryModule],
})
class ApiModule {}

export default ApiModule;
