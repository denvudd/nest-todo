import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Response<T> {
  data: T,
}

@Injectable()
export class TransformInterceptor<T>
implements NestInterceptor<T, Response<T>>
{
  intercept (
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          data: instanceToInstance(data, { excludeExtraneousValues: true }),
        };
      }),
    );
  }
}
