import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { JsonLogger } from '../json.logger';

describe('JsonLogger', () => {
  let jsonLogger: JsonLogger;

  beforeEach(() => {
    jsonLogger = new JsonLogger();

    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  describe('.formatMessage', () => {
    test('формат сообщения должен быть в формате JSON', () => {
      const result = jsonLogger.formatMessage('log', 'текст');
      expect(() => JSON.parse(result)).not.toThrow();
    });

    test('сообщение должно содержать правильные поля', () => {
      const result = jsonLogger.formatMessage('log', 'текст');
      const jsonResult = JSON.parse(result);
      expect(jsonResult.level).toBe('log');
      expect(jsonResult.message).toBe('текст');
      expect(jsonResult.optionalParams).toEqual([]);
    });

    test('сообщение может содержать опциональные параметры', () => {
      const result = jsonLogger.formatMessage(
        'log',
        'текст',
        'param1',
        'param2',
      );
      const jsonResult = JSON.parse(result);
      expect(jsonResult.optionalParams).toEqual(['param1', 'param2']);
    });
  });

  test('сообщение должно работать со всеми уровнями', () => {
    const levels = ['log', 'error', 'warn', 'debug', 'verbose'];

    levels.forEach((level) => {
      const result = jsonLogger.formatMessage(level, 'текст');
      const jsonResult = JSON.parse(result);
      expect(jsonResult.level).toBe(level);
    });
  });
});
