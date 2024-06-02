import { Injectable, NestMiddleware } from '@nestjs/common';
import { Counter } from 'prom-client';
import { Request, Response } from 'express';

const httpRequestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
      httpRequestCounter.inc({
        method: req.method,
        route: req.route ? req.route.path : req.path,
        status: res.statusCode,
      });
    });
    next();
  }
}