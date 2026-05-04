import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository';
import { OrderDto } from '../order/dto/order.dto';

@Injectable()
export class OrderRepository {
  private orders: OrderDto[] = [];
  private idCounter = 1;

  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(filmId: string, sessionId: string, seats: string[]) {
    const session = await this.filmsRepository.findSession(filmId, sessionId);
    if (!session) {
      return null;
    }

    const seatTaken = seats.filter((seat) => session.taken.includes(seat));
    if (seatTaken.length > 0) {
      return { error: 'Место уже занято', seats: seatTaken };
    }

    await this.filmsRepository.addTakenSeats(filmId, sessionId, seats);

    const order: OrderDto = {
      id: String(this.idCounter++),
      filmId,
      sessionId,
      seats,
      createdAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }
}
