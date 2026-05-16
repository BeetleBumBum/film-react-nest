import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from '../repository/order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
