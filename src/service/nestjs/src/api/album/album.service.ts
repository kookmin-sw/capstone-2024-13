import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from 'src/common/database/schema/album.schema';
import { Types } from 'mongoose';

@Injectable()
class AlbumService {
	constructor(@InjectModel('Album') private readonly albumModel: any) {}

	async find(query: any): Promise<Album[]> {
		try {
			return await this.albumModel.find(query);
		} catch (error) {
			throw error;
		}
	}

	async create(userId: Types.ObjectId, title: string, content: string) {
		try {
			return await new this.albumModel({ userId, title }).save();
		} catch (error) {
			throw error;
		}
	}
}

export default AlbumService;
