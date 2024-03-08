import { RawAxiosRequestConfig } from 'axios';
import axiosInstance from './base';

const postFetcher = async <ResType>(
	url: string,
	reqData?: any,
	options?: RawAxiosRequestConfig<any>,
): Promise<ResType> =>
	axiosInstance
		.post<ResType>(url, reqData, options)
		.then(response => response.data)
		.catch(error => {
			throw error;
		});

export default postFetcher;
