import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user/user.entity';
import { RequestWitUser } from 'src/interfaces/request.with.user';
import { ConfigService } from '@nestjs/config';

/**
 * Guard class that checks if the user is authorized. Gets the JWT token from the request headers,
 * verifies the token and adds information from the payload to the request.
 * If the JWT token is missing, throws an error.
 * uses in the @UseGuards() decorator in every controller except auth.controller
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWitUser>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify<User>(token, { secret: this.configService.get('JWT_SECRET', 'defaul_secret') });
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
