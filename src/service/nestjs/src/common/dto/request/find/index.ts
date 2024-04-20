import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';

export class Find<TRawDocType> {
	@IsNotEmpty()
	@ApiProperty({
		description: 'Filter query',
		type: Object,
		example: {
			albumId: { $in: ['60f9a8f7d1f9d9a7d1f9d9a7', '60f9a8f7d1f9d9a7d1f9d9a8'] },
		},
	})
	filter: FilterQuery<TRawDocType>;

	@IsOptional()
	@ApiProperty()
	projection?: ProjectionType<TRawDocType> | null;

	@IsOptional()
	@ApiProperty()
	options?: QueryOptions<TRawDocType> | null;
}
