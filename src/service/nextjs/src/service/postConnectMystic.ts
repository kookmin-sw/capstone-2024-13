import { Types } from 'mongoose';
import { postFetcher } from './api';

export const postConnectMystic = async (
	version: string,
	templateId: number,
): Promise<Types.ObjectId> => {
	return await postFetcher<Types.ObjectId>('/mystic/connect', { version, templateId }).catch(
		(error: Error) => {
			throw error;
		},
	);
};
