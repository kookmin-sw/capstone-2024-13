import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class Connect {
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Template ID' })
	templateId: string;
}

export default Connect;
