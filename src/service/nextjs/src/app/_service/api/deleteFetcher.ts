import axiosInstance from './base';

const deleteFetcher = async <ResType>(url: string, reqData?: any): Promise<ResType> =>
	axiosInstance
		.delete<ResType>(url, reqData)
		.then(res => res.data)
		.catch(error => {
			throw error;
		});

export default deleteFetcher;
