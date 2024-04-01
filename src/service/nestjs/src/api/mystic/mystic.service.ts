import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import axios, { AxiosResponse, AxiosError } from 'axios';


@Injectable()
class MysticService {
	constructor() {}

	async connect(version: string, templateId: string): Promise<Types.ObjectId> {
		try {
			const connectionId = await axios
				.post(`http://mystic:8000/connect/${version}`, { template_id: templateId })
				.then((response: AxiosResponse<any>) => {
					return response.data.connection_id;
				})
				.catch((error: AxiosError) => {
					throw error;
				});

			return connectionId;
		} catch (error) {
			throw error;
		}
	}

	async disconnect(connectionId: string): Promise<any> {
		try {
			return await axios
				.post('http://mystic:8000/disconnect', { connection_id: connectionId })
				.then((response: AxiosResponse<any>) => {
					return response.data;
				})
				.catch((error: AxiosError) => {
					console.log(error);
					throw error;
				});
		} catch (error) {
			throw error;
		}
	}

	async invoke(version: string, connectionId: string, content: string): Promise<any> {
		try {
			return await axios
				.post(`http://mystic:8000/chat/invoke/${version}`, { connection_id: connectionId, content })
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
