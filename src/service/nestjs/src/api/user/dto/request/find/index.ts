import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

class Find {
	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'User ID', required: false })
	_id?: Types.ObjectId;

	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Email', required: false })
	email?: string;

	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Nickname', required: false })
	nickname?: string;
}

export default Find;
