import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateAlbumDto } from '../album';

class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Album ID', required: false })
	_id?: string;

	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'User ID', required: false })
	userId?: string;

	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Album title', required: false })
	title?: string;
}

export default UpdateAlbumDto;
