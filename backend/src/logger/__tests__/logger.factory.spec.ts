import { describe, expect, test } from '@jest/globals';
import { createLogger } from '../logger.factory';
import { DevLogger } from '../dev.logger';
import { JsonLogger } from '../json.logger';
import { TskvLogger } from '../tskv.logger';

describe('createLogger', () => {
  test('должен возвращать DevLogger для формата dev', () => {
    expect(createLogger('dev')).toBeInstanceOf(DevLogger);
  });

  test('должен возвращать DevLogger для default', () => {
    expect(createLogger('другой_формат')).toBeInstanceOf(DevLogger);
  });

  test('должен возвращать JsonLogger для формата json', () => {
    expect(createLogger('json')).toBeInstanceOf(JsonLogger);
  });

  test('должен возвращать TskvLogger для формата tskv', () => {
    expect(createLogger('tskv')).toBeInstanceOf(TskvLogger);
  });

  test('должен работать с любым регистром', () => {
    expect(createLogger('JSON')).toBeInstanceOf(JsonLogger);
    expect(createLogger('TSKV')).toBeInstanceOf(TskvLogger);
    expect(createLogger('Dev')).toBeInstanceOf(DevLogger);
  });
});
