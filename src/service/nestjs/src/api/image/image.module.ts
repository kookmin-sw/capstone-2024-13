import { Module } from '@nestjs/common';
import ImageController from './image.controller';
import ImageService from './service/image.service';
import UserModule from '../user/user.module';
import S3Service from './service/s3.service';

@Module({
	imports: [UserModule],
	controllers: [ImageController],
	providers: [ImageService, S3Service],
})
class ImageModule {}

export default ImageModule;
