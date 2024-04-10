import { Types } from 'mongoose';

export interface Diary {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	title: string;
	content: string;
	isPublic: boolean;
	createdAt: Date;
	updatedAt: Date;
	albumId?: Types.ObjectId;
	images?: string[];
}
