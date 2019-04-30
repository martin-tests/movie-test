import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from 'src/movie';
import { movies as mockMovies } from 'src/movie.mock-data';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = mockMovies;
    return {movies};
  }
  genId(movies: Movie[]): number {
    return movies.length > 0 ? Math.max(...movies.map(hero => hero.id)) + 1 : 11;
  }
  // constructor() { }
}
