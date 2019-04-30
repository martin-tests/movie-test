import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/movie';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.sass']
})

export class MoviesComponent implements OnInit {
  movies: Movie[];
  selectedGenre: string;
  selectedOrder: string = "name";

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(genre?: string): void {
    this.selectedGenre = genre;
    this.movieService.getMovies(this.selectedOrder, genre)
        .subscribe(movies => {
          this.movies = movies;
        });
  }

  changeOrder(order: string): void {
    this.selectedOrder = order;
    this.getMovies(this.selectedGenre);
  }

}
