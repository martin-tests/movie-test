import { Component, OnInit } from '@angular/core';
import { genreType } from "src/genretype";
import { MoviesComponent } from 'src/app/movies/movies.component';

@Component({
  selector: 'app-movies-filter',
  templateUrl: './movies-filter.component.html',
  styleUrls: ['./movies-filter.component.sass']
})

export class MoviesFilterComponent implements OnInit {
  genres : string[];
  selectedGenre: string;

  constructor(private moviesComponent: MoviesComponent) {}

  ngOnInit() {
    this.genres = Object.keys(genreType);
  }

  onSelect(genre: string): void {
    this.moviesComponent.getMovies(genre);
    this.selectedGenre = genre;
  }
}
