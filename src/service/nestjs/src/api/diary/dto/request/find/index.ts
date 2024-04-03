import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

class Find {
	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Diary ID', required: false })
	_id?: string;

	// add albumId
	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Album ID', required: false })
	albumId?: string;

	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'User ID', required: false })
	userId?: string;

	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Email', required: false })
	title?: string;
}

export default Find;
