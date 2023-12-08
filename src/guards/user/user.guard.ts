import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from 'src/decorators/roles/role.decorator';
import * as jwt from 'jsonwebtoken';
import { DecodedJwt } from 'src/user/util/decoded-jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    //  If there is no @Roles()
    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.USER_KEY) as DecodedJwt;
      console.log(requiredRole);
      console.log(decoded);

      return requiredRole.some((role) => role === decoded.role);
    } catch (err) {
      throw new UnauthorizedException('User has no permission');
    }
  }
}
