import axiosInstance from './base';

const getFetcher = async <ResType>(
	url: string,
	params?: URLSearchParams | string,
): Promise<ResType> =>
	axiosInstance
		.get<ResType>(url, { params })
		.then(res => res.data)
		.catch(error => {
			throw error;
		});

export default getFetcher;
