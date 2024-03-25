import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class Invoke {
	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Connection ID' })
	connectionId: string;

	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Invoke message' })
	content: string;
}

export default Invoke;
