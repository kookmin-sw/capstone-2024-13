import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

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

	//count of Diary Default 0
	@Prop({ type: Number, default: 0 })
	count: number;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);

export type AlbumDocument = Album & Document;
