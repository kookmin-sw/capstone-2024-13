// CreateDiaryDto
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDiaryDto {
	@ApiProperty({
		type: String,
		description: 'Title',
		example: 'Today diary',
	})
	@IsString()
	@IsNotEmpty()
	@Length(1, 50)
	title: string;

	@ApiProperty({
		type: String,
		description: 'Content',
		example: 'Today diary content',
	})
	@IsString()
	@IsNotEmpty()
	content: string;
}
