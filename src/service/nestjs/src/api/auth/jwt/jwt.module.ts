import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UserModule from 'src/api/user/user.module';
import GoogleJwtStrategy from './google-jwt.strategy';
import UserJwtStrategy from './user-jwt.strategy';

@Module({
	imports: [UserModule, PassportModule],
	providers: [GoogleJwtStrategy, UserJwtStrategy],
})
class JwtAuthModule {}

export default JwtAuthModule;
