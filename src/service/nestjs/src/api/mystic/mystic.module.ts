import { Module } from '@nestjs/common';
import MysticController from './mystic.controller';
import MysticService from './mystic.service';

@Module({
	controllers: [MysticController],
	providers: [MysticService],
})
class MysticModule {}

export default MysticModule;
