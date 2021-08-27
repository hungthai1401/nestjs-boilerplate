import { HttpStatus } from '@nestjs/common';

export function ok(data: any): Record<string, any> {
  return {
    code: HttpStatus.OK,
    data,
  };
}

export function created(data: any): Record<string, any> {
  return {
    code: HttpStatus.CREATED,
    data,
  };
}

export function noContent(): Record<string, any> {
  return {
    code: HttpStatus.NO_CONTENT,
  };
}
