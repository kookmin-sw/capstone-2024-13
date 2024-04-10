import { Types } from 'mongoose';
import { User } from 'src/common/database/schema';

class Get extends User {
	_id: Types.ObjectId;
}

export default Get;
