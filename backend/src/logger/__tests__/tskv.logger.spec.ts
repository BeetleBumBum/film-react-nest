import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { TskvLogger } from '../tskv.logger';

describe('TskvLogger', () => {
  let tskvLogger: TskvLogger;

  beforeEach(() => {
    tskvLogger = new TskvLogger();

    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  describe('.formatMessage', () => {
    test('поля в записи должны разделяться символом табуляции \t', () => {
      const result = tskvLogger.formatMessage('log', 'текст');
      const fields = result.trim().split('\t');
      expect(fields[0]).toBe('level=log');
      expect(fields[1]).toBe('message=текст');
    });

    test('записи должны быть разделены символом переноса строки \n', () => {
      const result = tskvLogger.formatMessage('log', 'текст');
      expect(result.endsWith('\n')).toBe(true);
    });

    test('сообщение должно содержать правильные поля', () => {
      const result = tskvLogger.formatMessage('log', 'текст');
      const fields = result.trim().split('\t');
      expect(fields.length).toBe(2);
      expect(fields[0]).toBe('level=log');
      expect(fields[1]).toBe('message=текст');
    });

    test('сообщение может содержать опциональные параметры', () => {
      const result = tskvLogger.formatMessage(
        'log',
        'текст',
        'param1',
        'param2',
      );
      const fields = result.trim().split('\t');
      expect(fields.length).toBe(4);
      expect(fields[2]).toBe('param0=param1');
      expect(fields[3]).toBe('param1=param2');
    });

    test('message может быть строкой', () => {
      const result = tskvLogger.formatMessage('log', 'текст');
      expect(result).toContain('message=текст');
    });

    test('message может быть объектом и преобразовываться в строку', () => {
      const object = { film: 'test', session: '1', row: 2, seat: 5 };
      const result = tskvLogger.formatMessage('log', object);
      expect(result).toContain(`message=${JSON.stringify(object)}`);
    });

    test('сообщение должно работать со всеми уровнями', () => {
      const levels = ['log', 'error', 'warn', 'debug', 'verbose'];

      levels.forEach((level) => {
        const result = tskvLogger.formatMessage(level, 'текст');
        expect(result).toContain(`level=${level}`);
      });
    });
  });
});
