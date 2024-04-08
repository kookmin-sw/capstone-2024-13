// CreateAlbumDto
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAlbumDto {
	@ApiProperty({
		type: String,
		description: 'Title',
		example: 'Today album',
	})
	@IsString()
	@IsNotEmpty()
	@Length(1, 50)
	title: string;
}

export default CreateAlbumDto;
