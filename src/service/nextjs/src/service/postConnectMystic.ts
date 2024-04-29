import { Types } from 'mongoose';
import { postFetcher } from './api';

export const postConnectMystic = async (query: object): Promise<Types.ObjectId> => {
	const { version, ...rest } = query as { version: string; [key: string]: any };

	return await postFetcher<Types.ObjectId>(`/mystic/connect/${version}`, rest).catch(
		(error: Error) => {
			throw error;
		},
	);
};
