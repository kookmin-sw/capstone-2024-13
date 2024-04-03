import { RawAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axiosInstance from './base';

const postFetcher = async <ResType>(
	url: string,
	reqData?: any,
	options?: RawAxiosRequestConfig<any>,
): Promise<ResType> =>
	axiosInstance
		.post<ResType>(url, reqData, options)
		.then((res: AxiosResponse<ResType>) => res.data)
		.catch((error: AxiosError) => {
			throw error;
		});

export default postFetcher;
