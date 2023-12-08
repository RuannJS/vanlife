import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DecodedJwt } from 'src/user/util/decoded-jwt';

export const TokenDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const token = request.token;

    const decoded = jwt.decode(token) as DecodedJwt;

    return decoded;
  },
);
