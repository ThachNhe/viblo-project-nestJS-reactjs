import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(
    request: FastifyRequest['raw'],
    response: FastifyReply['raw'],

    next: () => void,
  ) {
    const { method } = request;
    // console.log('originalUrl', originalUrl);
    response.on('finish', () => {
      const { statusCode } = response;
      // const contentLength = response.get('content-length');
      this.logger.log(`${method}   ${statusCode}  `);
    });
    next();
  }
}
