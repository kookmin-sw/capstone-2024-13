import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ApiModule from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';

const configService = new ConfigService();

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			envFilePath: '.env',
		}),
		ApiModule,
		MongooseModule.forRoot(configService.getOrThrow('MONGO_URL')),
	],
})
class AppModule {}

export default AppModule;
