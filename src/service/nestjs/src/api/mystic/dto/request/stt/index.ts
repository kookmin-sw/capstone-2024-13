import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class STT {
	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ required: true, description: 'Connection ID' })
	connectionId: string;

	@IsNotEmpty()
	audio: any;
}

export default STT;
