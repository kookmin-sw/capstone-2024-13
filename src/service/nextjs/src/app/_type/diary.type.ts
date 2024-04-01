import { Types } from 'mongoose';

export interface Diary {
	_id: Types.ObjectId;
	images: string[];
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}
