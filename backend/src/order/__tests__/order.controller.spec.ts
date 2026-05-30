import { describe, beforeEach, jest, test, expect } from '@jest/globals';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';
import { Test } from '@nestjs/testing';
import { CreateOrderDto } from '../dto/create-order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const mockCreateOrderDto: CreateOrderDto = {
    tickets: [
      {
        film: 'test film',
        session: '2',
        daytime: '2026-05-01T11:11:11Z',
        row: 4,
        seat: 2,
        price: 2500,
      },
    ],
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn(),
      })
      .compile();

    orderController = moduleRef.get<OrderController>(OrderController);
    orderService = moduleRef.get<OrderService>(OrderService);
  });

  describe('create', () => {
    test('должен вызывать createOrder', () => {
      orderController.create(mockCreateOrderDto);
      expect(orderService.createOrder).toHaveBeenCalledWith(mockCreateOrderDto);
    });
  });
});
