import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDto } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('Film') private filmModel: Model<FilmDto>) {}

  async findAll() {
    return await this.filmModel.find();
  }

  async findById(id: string) {
    return this.filmModel.findOne({ id });
  }
}
