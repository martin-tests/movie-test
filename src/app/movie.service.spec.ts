import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MovieService } from './movie.service';
import { Movie } from 'src/movie';
import { movies } from 'src/movie.mock-data';
import { MessageService } from './message.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: { get: jasmine.Spy };
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [ HttpClientModule, HttpClientTestingModule ],
     providers: [ MovieService ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getMovies should return all movies', () => {
    const someMovies = movies;
    let serviceSpy = spyOn(service, "getMovies").and.returnValue(of(someMovies));
    service.getMovies("name").subscribe(movies => {
      console.log(movies.length);
      console.log(someMovies.length);
      expect(movies.length).toBe(someMovies.length);
      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  it('getMovie should return a movie', () => {
    const movieId = 2;
    const someMovie = movies[movieId];
    let serviceSpy = spyOn(service, "getMovies").and.returnValue(of(someMovie));
    service.getMovie(movieId).subscribe(movie => {
      expect(movie.name).toEqual(someMovie.name);
      expect(serviceSpy).toHaveBeenCalled();
    });
  });

});
