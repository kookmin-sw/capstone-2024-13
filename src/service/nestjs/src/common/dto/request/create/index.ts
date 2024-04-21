import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { AnyObject } from 'mongoose';

export class Create<TRawDocType> {
	@IsOptional()
	@ApiProperty()
	doc?: Partial<TRawDocType>;

	@IsOptional()
	@ApiProperty()
	fields?: any | null;

	@IsOptional()
	@ApiProperty()
	options?: boolean | AnyObject;
}
