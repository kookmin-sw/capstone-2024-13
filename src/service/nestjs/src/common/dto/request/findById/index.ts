import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ProjectionType, QueryOptions } from 'mongoose';

export class FindById<TRawDocType> {
	@IsNotEmpty()
	@ApiProperty({ description: 'id', example: '60f9a8f7d1f9d9a7d1f9d9a7' })
	id: any;

	@IsOptional()
	@ApiProperty()
	projection?: ProjectionType<TRawDocType> | null;

	@IsOptional()
	@ApiProperty()
	options?: QueryOptions<TRawDocType> | null;
}
