import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IAddParamsToBodyArgs {
  paramName: Array<string> | string;
}

export const AddParamsToBody = createParamDecorator(
  ({ paramName }: IAddParamsToBodyArgs, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (Array.isArray(paramName)) {
      paramName.forEach((item) => (req.body[item] = req.params[item]));
    } else {
      req.body[paramName] = req.params[paramName];
    }

    return req;
  },
);
