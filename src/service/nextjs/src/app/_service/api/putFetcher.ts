import axiosInstance from './base';
import { AxiosResponse, AxiosError } from 'axios';

const putFetcher = async <ResType>(url: string, reqData?: any): Promise<ResType> =>
	axiosInstance
		.put<ResType>(url, reqData)
		.then((res: AxiosResponse<ResType>) => res.data)
		.catch((error: AxiosError) => {
			throw error;
		});

export default putFetcher;
