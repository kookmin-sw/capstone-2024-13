import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Album } from 'src/common/database/schema';

class UpdateAlbumDto extends PartialType(Album) {
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

	@IsOptional()
	@ApiProperty({ description: 'Album count', required: false })
	$inc?: { count: number };
}

export default UpdateAlbumDto;
