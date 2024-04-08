import { PartialType } from '@nestjs/swagger';
import { Create } from '..';

class Update extends PartialType(Create) {}

export default Update;
