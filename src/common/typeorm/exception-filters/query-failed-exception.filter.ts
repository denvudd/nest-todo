import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';


@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch (exception: QueryFailedError & Record<string, unknown>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(HttpStatus.BAD_REQUEST)
      .json({
        message: exception.detail,
        error: 'Bad Request',
        statusCode: 400,
      });
  }
}
