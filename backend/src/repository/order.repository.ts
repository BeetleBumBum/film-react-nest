import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDto } from '../films/dto/films.dto';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel('Film') private filmModel: Model<FilmDto>) {}

  async findFilmById(id: string) {
    return this.filmModel.findOne({ id });
  }

  async addTakenSeat(film: string, session: string, seatNumbers: string[]) {
    return this.filmModel.findOneAndUpdate(
      {
        id: film,
        'schedule.id': session,
        'schedule.taken': { $not: { $elemMatch: { $in: seatNumbers } } },
      },
      {
        $addToSet: { 'schedule.$.taken': { $each: seatNumbers } },
      },
      { new: true },
    );
  }
}
