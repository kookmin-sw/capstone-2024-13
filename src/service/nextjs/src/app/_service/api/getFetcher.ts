import axiosInstance from './base';
import { AxiosResponse, AxiosError } from 'axios';

const getFetcher = async <ResType>(
	url: string,
	params?: URLSearchParams | string,
): Promise<ResType> =>
	axiosInstance
		.get<ResType>(url, { params })
		.then((res: AxiosResponse<ResType>) => res.data)
		.catch((error: AxiosError) => {
			throw error;
		});

export default getFetcher;
