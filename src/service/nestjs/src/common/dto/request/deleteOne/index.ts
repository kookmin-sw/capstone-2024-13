import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { DeleteOptions } from 'mongodb';
import { FilterQuery, MongooseQueryOptions } from 'mongoose';

export class DeleteOne<TRawDocType> {
	@IsOptional()
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
	options?: (DeleteOptions & Omit<MongooseQueryOptions<TRawDocType>, 'lean' | 'timestamps'>) | null;
}
