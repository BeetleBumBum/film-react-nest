import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const chunks: string[] = [];

    chunks.push(`level=${level}`);

    if (typeof message === 'object') {
      chunks.push(`message=${JSON.stringify(message)}`);
    } else {
      chunks.push(`message=${message}`);
    }

    const optionalParam =
      optionalParams?.map((param, index) => {
        return `param${index}=${param}`;
      }) || [];

    chunks.push(...optionalParam);

    return chunks.join('\t') + '\n';
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
}
