import winston from 'winston';

export class Logger {
  private logger: winston.Logger;

  constructor() {
    const { combine, timestamp, printf, colorize } = winston.format;

    const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
      let msg = `${timestamp} [${level}]: ${message}`;

      if (metadata.error && metadata.error.stack) {
        msg += `\n\nStack Trace:\n${metadata.error.stack}`;
        delete metadata.error.stack;
      }

      if (Object.keys(metadata).length > 0) {
        msg += '\n\nAdditional Information:';
        for (const [key, value] of Object.entries(metadata)) {
          if (key !== 'error') {
            msg += `\n${key}: ${JSON.stringify(value, null, 2)}`;
          }
        }
      }

      return msg;
    });

    // TODO: Would something like this work better by incorporating Morgan?
    // https://github.com/gonzaloplaza/express-ts-ddd/blob/0de3752d9c5bce62691bcd5fbd721cd02df9603b/src/shared/infrastructure/logger/index.ts#L45
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: combine(
        colorize(),
        timestamp(),
        logFormat
      ),
      transports: [
        new winston.transports.Console()
      ]
    });
  }

  info(message: string, meta?: object) {
    this.logger.info(message, meta);
  }

  error(message: string, error?: Error, meta?: object) {
    this.logger.error(message, { error, ...meta });
  }

  warn(message: string, meta?: object) {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: object) {
    this.logger.debug(message, meta);
  }
}