import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDto } from '../films/dto/films.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Film') private filmModel: Model<FilmDto>) {}

  async createOrder(film: string, session: string, row: number, seat: number) {
    const seatNumber = `${row}:${seat}`;

    const updatedFilm = await this.filmModel.findOneAndUpdate(
      {
        id: film,
        'schedule.id': session,
        'schedule.taken': { $ne: seatNumber },
      },
      {
        $push: { 'schedule.$.taken': seatNumber },
      },
      { new: true },
    );

    if (!updatedFilm) {
      const foundFilm = await this.filmModel.findOne({ id: film });
      if (!foundFilm) {
        throw new NotFoundException(`Фильм ${film} не найден`);
      }

      const foundSession = foundFilm.schedule.find((s) => s.id === session);

      if (!foundSession) {
        throw new NotFoundException(`Сеанс ${session} не найден`);
      }

      throw new ConflictException(`Место ${row}:${seat} уже занято`);
    }

    const updatedSession = updatedFilm.schedule.find((s) => s.id === session);

    return {
      id: randomUUID(),
      film: film,
      session: session,
      row: row,
      seat: seat,
      daytime: updatedSession.daytime,
      price: updatedSession.price,
    };
  }
}
