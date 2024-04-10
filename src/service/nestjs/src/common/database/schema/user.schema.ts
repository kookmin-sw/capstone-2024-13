import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

const userSchemaOptions: SchemaOptions = {
	autoCreate: true,
	timestamps: true,
	collection: 'users',
	toJSON: {
		transform: (doc: any, ret: any) => {
			delete ret.__v;
			return ret;
		},
	},
};

@Schema(userSchemaOptions)
export class User {
	@Prop({ type: String, required: true, unique: true })
	@ApiProperty({
		type: String,
		description: 'Email',
		example: 'younganswer@kookmin.ac.kr',
	})
	email: string;

	@Prop({ type: String, required: true })
	@ApiProperty({
		type: String,
		description: 'nickname',
		example: 'younganswer',
	})
	nickname: string;

	@Prop({
		type: Types.ObjectId,
		required: false,
		unique: true,
		sparse: true,
		ref: 'images',
	})
	@ApiProperty({
		example: '49fafa4d2ca3602935816679',
		type: Types.ObjectId,
		required: false,
		uniqueItems: true,
	})
	profileImageId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
