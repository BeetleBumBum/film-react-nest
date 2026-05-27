import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {}

  async findAll() {
    return await this.filmRepository.find();
  }

  async findById(id: string) {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
  }
}
