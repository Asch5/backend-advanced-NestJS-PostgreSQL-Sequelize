import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt/dist';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    console.log(`requiredRoles === ${requiredRoles}`);
    if (!requiredRoles) {
      return Promise.resolve(true);
    }

    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException({
          message: 'Authorization header is missing',
        });
      }

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User dose not authorization (bearer or token is incorrect)',
        });
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      //We check. Whether the user has this role.
      return user.roles.some((role: any) => requiredRoles.includes(role.value));
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({
        message: e.message || 'Something wrong',
      });
    }
  }
}
