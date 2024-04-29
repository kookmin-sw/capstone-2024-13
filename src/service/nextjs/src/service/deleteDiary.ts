import { deleteFetcher } from './api';

export const deleteDiary = async (query: object): Promise<void> => {
	const { id } = query as { id: string };

	return await deleteFetcher<void>(`/diary/${id}`).catch((error: any) => {
		throw error;
	});
};
