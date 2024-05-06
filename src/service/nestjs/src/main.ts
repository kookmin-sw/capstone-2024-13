import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import setupSwagger from './util/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const originList = [configService.getOrThrow('NEXTJS_URL')];

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);
	app.enableCors({
		origin: originList,
		credentials: true,
	});
	app.use(cookieParser());

	setupSwagger(app);

	await app.listen(3000);
}
bootstrap();
