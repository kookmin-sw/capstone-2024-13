import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

class Presigned {
	@IsNotEmpty()
	@IsString()
	@IsIn(['profile', 'diary'])
	@Trim()
	@ApiProperty({ description: 'Path' })
	path: string;
}

export default Presigned;
