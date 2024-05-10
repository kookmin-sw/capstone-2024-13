import axiosInstance from './base';
import { AxiosResponse, AxiosError } from 'axios';

const deleteFetcher = async <ResType>(url: string, reqData?: any): Promise<ResType> =>
	axiosInstance
		.delete<ResType>(url, reqData)
		.then((response: AxiosResponse<ResType>) => response.data)
		.catch((error: AxiosError) => {
			throw error;
		});

export default deleteFetcher;
