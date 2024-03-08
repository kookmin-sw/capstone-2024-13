import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

const userSchemaOptions: SchemaOptions = {
	autoCreate: true,
	timestamps: true,
	collection: 'users',
	toJSON: {
		transform: (doc, ret) => {
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

	@Prop({ type: String, required: false, default: null })
	@ApiProperty({
		type: String,
		description: 'Profile image url',
		required: false,
	})
	profileImageUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
