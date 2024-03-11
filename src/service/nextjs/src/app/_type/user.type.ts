import { Types } from 'mongoose';

export interface User {
	_id: Types.ObjectId;
	email: string;
	nickname: string;
	profileImageUrl?: Types.ObjectId;
	diaries?: Types.ObjectId[];
}
