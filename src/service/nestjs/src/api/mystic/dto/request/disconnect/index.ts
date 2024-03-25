import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class Disconnect {
	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Connection ID' })
	connectionId: string;
}

export default Disconnect;
