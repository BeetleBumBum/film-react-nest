import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from '../repository/order.repository';
import { FilmsRepository } from '../repository/films.repository';

@Module({
  controllers: [OrderController],
  providers: [FilmsRepository, OrderService, OrderRepository],
})
export class OrderModule {}
