import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
class ImageService {
	constructor() {}

	async create() {
		try {
			return new Types.ObjectId();
		} catch (error) {
			throw error;
		}
	}
}

export default ImageService;
