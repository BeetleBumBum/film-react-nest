import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderrepository: OrderRepository) {}

  async createOrder(filmId: string, sessionId: string, seats: string[]) {
    return this.orderrepository.createOrder(filmId, sessionId, seats);
  }
}
