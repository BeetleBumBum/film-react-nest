import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    return await this.filmsRepository.findAll();
  }

  async findSchedule(id: string) {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      throw new NotFoundException(`Фильм ${id} не найден`);
    }
    return film;
  }
}
