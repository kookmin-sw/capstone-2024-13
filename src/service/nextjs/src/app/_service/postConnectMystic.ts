import { Types } from 'mongoose';
import { postFetcher } from './api';

const postConnectMystic = async (query: object): Promise<Types.ObjectId> => {
	const { version, templateId } = query as { version: string; templateId: string };

	return await postFetcher<Types.ObjectId>(`/mystic/connect/${version}`, { templateId }).catch(
		(error: any) => {
			throw error;
		},
	);
};

export default postConnectMystic;
