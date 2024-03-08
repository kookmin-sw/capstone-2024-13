import axiosInstance from './base';

const putFetcher = async <ResType>(url: string, reqData?: any): Promise<ResType> =>
	axiosInstance
		.put<ResType>(url, reqData)
		.then(res => res.data)
		.catch(error => {
			throw error;
		});

export default putFetcher;
