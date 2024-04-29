import { RawAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'; // AxiosResponse 및 AxiosError 임포트
import axiosInstance from './base';

const patchFetcher = async <ResType>(
	url: string,
	reqData?: any,
	options?: RawAxiosRequestConfig<any>,
): Promise<ResType> =>
	axiosInstance
		.patch<ResType>(url, reqData, options)
		.then((res: AxiosResponse<ResType>) => res.data)
		.catch((error: AxiosError) => {
			throw error;
		});

export default patchFetcher;
