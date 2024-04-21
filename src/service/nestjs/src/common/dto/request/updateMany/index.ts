import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UpdateOptions } from 'mongodb';
import {
	FilterQuery,
	MongooseQueryOptions,
	UpdateQuery,
	UpdateWithAggregationPipeline,
} from 'mongoose';

export class UpdateMany<TRawDocType> {
	@IsNotEmpty()
	@ApiProperty({
		description: 'Filter query',
		type: Object,
		example: {
			albumId: { $in: ['60f9a8f7d1f9d9a7d1f9d9a7', '60f9a8f7d1f9d9a7d1f9d9a8'] },
		},
	})
	filter?: FilterQuery<TRawDocType>;

	@IsOptional()
	@ApiProperty()
	update?: UpdateQuery<TRawDocType> | UpdateWithAggregationPipeline;

	@IsOptional()
	@ApiProperty()
	options?: (UpdateOptions & Omit<MongooseQueryOptions<TRawDocType>, 'lean'>) | null;
}
