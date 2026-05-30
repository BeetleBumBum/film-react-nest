import { describe, beforeEach, jest, test, expect } from '@jest/globals';
import { FilmsController } from '../films.controller';
import { FilmsService } from '../films.service';
import { Test } from '@nestjs/testing';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn(() => Promise.resolve([])),
        findSchedule: jest.fn(() => Promise.resolve({ schedules: [] })),
      })
      .compile();

    filmsController = moduleRef.get<FilmsController>(FilmsController);
    filmsService = moduleRef.get<FilmsService>(FilmsService);
  });

  describe('findAll', () => {
    test('должен вызывать функцию findAll', () => {
      filmsController.findAll();
      expect(filmsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findSchedule', () => {
    test('должен вызывать функцию findSchedule с корректным id', () => {
      const id = 'test_id';

      filmsController.findSchedule(id);
      expect(filmsService.findSchedule).toHaveBeenCalledWith(id);
    });
  });
});
