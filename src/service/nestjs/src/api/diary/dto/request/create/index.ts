// CreateDiaryDto
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class Create {
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

	@ApiProperty({
		type: Boolean,
		description: 'Public',
		example: false,
	})
	@IsNotEmpty()
	isPublic: boolean;

	@ApiProperty({
		type: [String],
		required: false,
		description: 'Image filename array',
		example: ['image1.jpg', 'image2.jpg'],
	})
	@IsOptional()
	images?: string[];

	@ApiProperty({
		type: String,
		required: false,
		description: 'Album ID',
		example: '60c1f5c9e4f9c7f7e8c2b9f5',
	})
	@IsOptional()
	albumId?: string;
}

export default Create;
