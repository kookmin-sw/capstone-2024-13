import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class Connect {
	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Template ID' })
	templateId: string;
}

export default Connect;
