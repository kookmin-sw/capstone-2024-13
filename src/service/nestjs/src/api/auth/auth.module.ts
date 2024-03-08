import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import JwtAuthModule from './jwt/jwt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import UserModule from '../user/user.module';
import AuthController from './auth.controller';
import { AuthService, CookieService } from './service';
import GoogleOAuth2Module from './google-oauth2/google-oauth2.module';

@Module({
	imports: [
		HttpModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow('JWT_SECRET'),
				signOptions: { expiresIn: '1h' },
			}),
		}),
		GoogleOAuth2Module,
		JwtAuthModule,
		UserModule,
	],
	controllers: [AuthController],
	providers: [AuthService, CookieService],
})
class AuthModule {}

export default AuthModule;
