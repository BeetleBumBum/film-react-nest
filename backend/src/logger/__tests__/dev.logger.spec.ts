import { describe, expect, test } from '@jest/globals';
import { DevLogger } from '../dev.logger';
import { ConsoleLogger } from '@nestjs/common';

describe('DevLogger', () => {
  test('логгер должен расширять ConsoleLogger', () => {
    const logger = new DevLogger();
    expect(logger).toBeInstanceOf(ConsoleLogger);
  });
});
