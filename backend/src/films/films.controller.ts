import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    const films = await this.filmsService.findAll();
    return { total: films.length, items: films };
  }

  @Get(':id/schedule')
  async findSchedule(@Param('id') id: string) {
    const film = await this.filmsService.findSchedule(id);

    if (!film) {
      return { total: 0, items: [] };
    }
    return { total: film.schedule.length, items: film.schedule };
  }
}
