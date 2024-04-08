import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

const albumSchemaOptions: SchemaOptions = {
	autoCreate: true,
	timestamps: true,
	collection: 'albums',
	toJSON: {
		transform: (doc: any, ret: any) => {
			delete ret.__v;
			return ret;
		},
	},
};

@Schema(albumSchemaOptions)
export class Album {
	//One-to-Squillions
	@Prop({ type: String, required: true })
	userId: string;

	@Prop({ type: String, required: true })
	@ApiProperty({
		type: String,
		description: 'Title',
		example: 'Album example',
	})
	title: string;

	@Prop({ type: Date, default: Date.now })
	@ApiProperty({
		type: Date,
		description: 'Created date',
		example: '2021-01-01T00:00:00.000Z',
	})
	createdAt: Date;

	@Prop({ type: Date, default: Date.now })
	@ApiProperty({
		type: Date,
		description: 'Updated date',
		example: '2021-01-01T00:00:00.000Z',
	})
	updatedAt: Date;

	//count of Diary Default 0
	@Prop({ type: Number, default: 0 })
	count: number;

	@Prop({ type: String, required: false })
	@ApiProperty({
		type: String,
		description: 'Thumbnail',
		example: '/default-image-01.png',
	})
	thumbnail?: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);

export type AlbumDocument = Album & Document;
