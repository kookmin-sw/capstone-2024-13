import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class Summary {
	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty()
	connectionId: string;
}

export default Summary;
