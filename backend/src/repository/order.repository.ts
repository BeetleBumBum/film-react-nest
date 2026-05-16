import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findFilmById(id: string) {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
  }

  async addTakenSeat(film: string, session: string, seatNumbers: string[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const schedule = await queryRunner.manager.findOne(Schedule, {
        where: { id: session, filmId: film },
      });

      if (!schedule) {
        return null;
      }

      const currentTakenSeats: string[] = schedule.taken
        ? schedule.taken.split(',').filter((s) => s !== '')
        : [];
      const isSeatTaken = seatNumbers.some((seat) =>
        currentTakenSeats.includes(seat),
      );

      if (isSeatTaken) {
        return null;
      }

      const updatedTaken = [...currentTakenSeats, ...seatNumbers];

      await queryRunner.manager.update(
        Schedule,
        { id: session },
        { taken: updatedTaken.join(',') },
      );

      await queryRunner.commitTransaction();

      return this.filmRepository.findOne({
        where: { id: film },
        relations: ['schedules'],
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
