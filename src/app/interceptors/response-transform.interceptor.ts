import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from './interfaces/response.interface';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const { statusCode: code } = ctx.switchToHttp().getResponse();
    return next.handle().pipe(map((data) => ({ code, data })));
  }
}
