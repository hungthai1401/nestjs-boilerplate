import { Request } from '@module/auth/interfaces/request.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user }: Request = ctx.switchToHttp().getRequest();
    return user;
  },
);
