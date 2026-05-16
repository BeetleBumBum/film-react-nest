import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { OrderRepository } from '../repository/order.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { tickets } = createOrderDto;

    const film = tickets[0].film;
    const session = tickets[0].session;

    const foundFilm = await this.orderRepository.findFilmById(film);
    if (!foundFilm) {
      throw new NotFoundException(`Фильм ${film} не найден`);
    }

    const foundSession = foundFilm.schedules.find((s) => s.id === session);
    if (!foundSession) {
      throw new NotFoundException(`Сеанс ${session} не найден`);
    }

    const seatNumbers = tickets.map((t) => `${t.row}:${t.seat}`);

    const updatedFilm = await this.orderRepository.addTakenSeat(
      film,
      session,
      seatNumbers,
    );

    if (!updatedFilm) {
      throw new ConflictException('Выбранные места заняты');
    }

    const updatedSession = updatedFilm.schedules.find((s) => s.id === session);

    const items = tickets.map((ticket) => ({
      id: randomUUID(),
      film: ticket.film,
      session: ticket.session,
      row: ticket.row,
      seat: ticket.seat,
      daytime: updatedSession.daytime,
      price: updatedSession.price,
    }));

    return { total: items.length, items };
  }
}
