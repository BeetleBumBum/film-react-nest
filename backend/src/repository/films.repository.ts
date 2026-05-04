import { Injectable } from '@nestjs/common';
import { FilmModel } from '../schemas/film.schema';

@Injectable()
export class FilmsRepository {
  async findAll() {
    return FilmModel.find();
  }

  async findById(id: string) {
    return FilmModel.findOne({ id: id });
  }

  async findSession(filmId: string, sessionId: string) {
    const film = await FilmModel.findOne(
      { id: filmId, 'schedule.id': sessionId },
      { 'schedule.$': 1 },
    );

    return film?.schedule?.[0] || null;
  }

  async addTakenSeats(filmId: string, sessionId: string, seats: string[]) {
    return FilmModel.findOneAndUpdate(
      { id: filmId, 'schedule.id': sessionId },
      { $addToSet: { 'schedule.$.taken': { $each: seats } } },
      { new: true },
    );
  }

  async save(film) {
    const newFilm = new FilmModel(film);
    return newFilm.save();
  }

  async update(id: string, data) {
    return FilmModel.findOneAndUpdate(
      { id: id },
      { $set: data },
      { new: true },
    );
  }

  async delete(id: string) {
    return FilmModel.deleteOne({ id: id });
  }
}
