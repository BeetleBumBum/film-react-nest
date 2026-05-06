import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectModel('Film') private filmModel: Model<FilmDto>) {}

  async findAll() {
    return await this.filmModel.find();
  }

  async findSchedule(id: string) {
    const film = await this.filmModel.findOne({ id: id });

    if (!film) {
      throw new NotFoundException(`Фильм ${id} не найден`);
    }
    return film;
  }
}
