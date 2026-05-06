import {
  Controller,
  Post,
  Body,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const orders = [];

      for (const ticket of createOrderDto.tickets) {
        const order = await this.orderService.createOrder(
          ticket.film,
          ticket.session,
          ticket.row,
          ticket.seat,
        );
        orders.push(order);
      }

      return {
        total: orders.length,
        items: orders,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Неизвестная ошибка';
      if (message.includes('уже занято')) {
        throw new ConflictException(message);
      }
      throw new BadRequestException(message);
    }
  }
}
