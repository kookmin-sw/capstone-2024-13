import { PartialType } from '@nestjs/swagger';
import { User } from 'src/common/database/schema';

class Update extends PartialType(User) {}

export default Update;
