import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class TTS {
	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty()
	text: string;

	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty()
	speaker: string;
}

export default TTS;
