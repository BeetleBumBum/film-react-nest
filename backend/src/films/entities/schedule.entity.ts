import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column('text', { array: true })
  taken: string[];

  @Column({ name: 'filmId' })
  filmId: string;

  @ManyToOne(() => Film, (film) => film.schedules)
  @JoinColumn({ name: 'filmId' })
  film: Film;
}
