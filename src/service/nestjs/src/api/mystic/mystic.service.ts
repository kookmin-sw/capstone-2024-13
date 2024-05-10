import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse, AxiosError } from 'axios';
import * as Dto from './dto';

const axiosInstance = axios.create({
	baseURL: 'http://mystic:8000',
	withCredentials: true,
});

@Injectable()
class MysticService {
	constructor() {}

	async connect(connectRequestDto: Dto.Request.Connect): Promise<Dto.Response.Connect> {
		try {
			const { version, templateId } = connectRequestDto;

			return await axiosInstance
				.post<Dto.Response.Connect>('/connect', { version, template_id: templateId })
				.then((response: AxiosResponse<Dto.Response.Connect>) => {
					return response.data;
				})
				.catch((error: AxiosError) => {
					throw error;
				});
		} catch (error) {
			throw error;
		}
	}

	async uploadImage(uploadImageRequestDto: Dto.Request.UploadImage): Promise<any> {
		try {
			const { connectionId, url } = uploadImageRequestDto;

			return await axios
				.post<Dto.Response.UploadImage>('/image/upload', {
					connection_id: connectionId,
					url,
				})
				.then((response: AxiosResponse<Dto.Response.UploadImage>) => {
					return response.data;
				})
				.catch((error: AxiosError) => {
					throw error;
				});
		} catch (error) {
			throw error;
		}
	}

	async invoke(connectionId: string, content: string): Promise<any> {
		try {
			return await axios
				.post<any>('/chat/invoke', { connection_id: connectionId, content })
				.then((response: AxiosResponse<any>) => {
					return response.data;
				})
				.catch((error: AxiosError) => {
					throw error;
				});
		} catch (error) {
			throw error;
		}
	}

	async disconnect(connectionId: string): Promise<any> {
		try {
			return await axios
				.post<any>('/disconnect', { connection_id: connectionId })
				.then((response: AxiosResponse<any>) => {
					return response.data;
				})
				.catch((error: AxiosError) => {
					throw error;
				});
		} catch (error) {
			throw error;
		}
	}
}

export default MysticService;
