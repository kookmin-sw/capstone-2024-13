import { Types } from 'mongoose';

export interface Album {
	_id: Types.ObjectId;
	userId: string;
	title: string;
	count: number;
	thumbnail?: string;
}
