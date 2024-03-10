import { Types } from 'mongoose';

export interface Diary {
	_id: Types.ObjectId;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}
