import { Module } from '@nestjs/common';
import MysticController from './mystic.controller';
import MysticService from './mystic.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		HttpModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				baseURL: configService.getOrThrow('MYSTIC_URL'),
				withCredentials: true,
			}),
		}),
	],
	controllers: [MysticController],
	providers: [MysticService],
})
class MysticModule {}

export default MysticModule;
