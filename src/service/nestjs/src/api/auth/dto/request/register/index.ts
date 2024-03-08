import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class Register {
	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ type: String, description: 'nickname' })
	nickname: string;
}

export default Register;
