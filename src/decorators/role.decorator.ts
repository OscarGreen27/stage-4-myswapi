import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enum/role.enum';

//creating the @Role() decorator is required for role guard to work
export const ROLE_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
