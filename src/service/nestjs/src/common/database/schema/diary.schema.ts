import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Album } from './album.schema';

const diarySchemaOptions: SchemaOptions = {
	autoCreate: true,
	timestamps: true,
	collection: 'diaries',
	toJSON: {
		transform: (doc: any, ret: any) => {
			delete ret.__v;
			return ret;
		},
	},
};

@Schema(diarySchemaOptions)
export class Diary {
	//One-to-Squillions
	@Prop({ type: String, required: true })
	userId: string;

	@Prop({ type: String, required: true })
	@ApiProperty({
		type: String,
		description: 'Title',
		example: 'Today diary',
	})
	title: string;

	@Prop({ type: String, required: true })
	@ApiProperty({
		type: String,
		description: 'Content',
		example: 'Today diary content',
	})
	content: string;

	//image filename array
	@Prop({ type: [String], required: false })
	@ApiProperty({
		type: [String],
		description: 'Image filename array',
		example: ['image1.jpg', 'image2.jpg'],
	})
	images?: string[];

	//One-to-Squillions album id
	@Prop({ type: String, required: false, ref: Album.name })
	@ApiProperty({
		type: String,
		description: 'Album id',
		example: '49fafa4d2ca3602935816679',
	})
	albumId?: string;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);

export type DiaryDocument = Diary & Document;
