import { User } from 'src/entities/user/user.entity';
import { Request } from 'express';

/**
 * Express class extension Request optional parameters user
 */
export interface RequestWitUser extends Request {
  user?: User;
}
