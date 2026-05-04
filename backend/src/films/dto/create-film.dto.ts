export class CreateFilmDto {
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: {
    daytime: string;
    hall: number;
    rows: number;
    seats: number;
    price: number;
  }[];
}
