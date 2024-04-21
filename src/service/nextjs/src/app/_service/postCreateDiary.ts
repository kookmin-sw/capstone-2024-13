import { AnyObject } from 'mongoose';
import { Diary } from '../_type';
import { postFetcher } from './api';

export const postCreateDiary = async (
	doc?: Partial<Diary>,
	fields?: any | null,
	options?: boolean | AnyObject,
): Promise<Diary> => {
	return await postFetcher<Diary>('/diary', { doc, fields, options }).catch(error => {
		throw error;
	});
};
