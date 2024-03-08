import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/common/database/schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
class UserModule {}

export default UserModule;
