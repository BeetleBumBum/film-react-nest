import mongoose, { Schema } from 'mongoose';
import { FilmDto, ScheduleDto } from '../films/dto/films.dto';

const scheduleSchema = new Schema<ScheduleDto>({
  id: {
    type: String,
    required: true,
  },
  daytime: {
    type: String,
    required: true,
  },
  hall: {
    type: Number,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => v > 0,
      message: 'Ряд должен быть положительным числом',
    },
  },
  seats: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => v > 0,
      message: 'Место должно быть положительным числом',
    },
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => v > 0,
      message: 'Цена должна быть положительным числом',
    },
  },
  taken: {
    type: [String],
    default: [],
  },
});

const filmSchema = new Schema<FilmDto>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => v >= 0 && v <= 10,
      message: 'Рейтинг фильма должен быть от 0 до 10 баллов',
    },
  },
  director: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  tags: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  about: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000,
  },
  schedule: {
    type: [scheduleSchema],
    default: [],
  },
});

export const FilmModel = mongoose.model<FilmDto>('Film', filmSchema);
