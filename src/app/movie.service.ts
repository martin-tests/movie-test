import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/movie';
import { genreType, GenreType } from 'src/genretype';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  getMovies(order: string, genrestr?: string): Observable<Movie[]> {
    this.messageService.add(`MovieService: fetched movies`);
    let url = this.moviesUrl;
    if (genrestr !== undefined) {
      let genre : GenreType = genreType[genrestr];
      url = `${this.moviesUrl}/?genres=${genre}`;
    }
    return this.http.get<Movie[]>(url)
      .pipe(
        map((result : Movie[]) => {
          return result.sort((a : Movie, b: Movie) => {
              if (order === "rating") {
                if (a.rate < b.rate) return 1;
                if (a.rate > b.rate) return -1;
                return 0;
              } else {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              }
              
          });
        }),
        tap(_ => this.log('fetched movies')),
        catchError(this.handleError<Movie[]>('getMovies', []))
      );
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

  getMovie(id: number): Observable<Movie> {
    this.messageService.add(`MovieService: fetched movie id=${id}`);
    // return of(movies.find(movie => movie.id === id));
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    )
  }
  
searchMovies(term: string): Observable<Movie[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Movie[]>(`${this.moviesUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found movies matching "${term}"`)),
    catchError(this.handleError<Movie[]>('searchMovies', []))
  );
}
  
  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }

  public moviesUrl = 'api/movies';
}
