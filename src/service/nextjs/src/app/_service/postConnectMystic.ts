import { Types } from 'mongoose';
import { postFetcher } from './api';

const postConnectMystic = async (query: object): Promise<Types.ObjectId> => {
	const { version } = query as { version: string; [key: string]: any };

	return await postFetcher<Types.ObjectId>(`/mystic/connect/${version}`).catch(error => {
		throw error;
	});
};

export default postConnectMystic;
