import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RequestWitUser } from 'src/interfaces/request.with.user';
/**
 * guard that checks if the user is allowed to perform an action.
 * fires after authguard. uses in the @UseGuards() decorator in every controller except auth.controller
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<RequestWitUser>();
    if (!user) {
      throw new UnauthorizedException();
    }
    return requiredRoles.some((role) => user?.role?.includes(role));
  }
}
