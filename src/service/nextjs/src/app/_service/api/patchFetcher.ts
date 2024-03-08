import { RawAxiosRequestConfig } from 'axios';
import axiosInstance from './base';

const patchFetcher = async <ResType>(
	url: string,
	reqData?: any,
	options?: RawAxiosRequestConfig<any>,
): Promise<ResType> =>
	axiosInstance
		.patch<ResType>(url, reqData, options)
		.then(res => res.data)
		.catch(error => {
			throw error;
		});

export default patchFetcher;
