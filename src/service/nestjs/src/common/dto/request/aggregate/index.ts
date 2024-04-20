import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { AggregateOptions, PipelineStage } from 'mongoose';

export class Aggregate {
	@IsOptional()
	@ApiProperty()
	pipeline?: PipelineStage[];

	@IsOptional()
	@ApiProperty()
	options?: AggregateOptions;
}

export default Aggregate;
