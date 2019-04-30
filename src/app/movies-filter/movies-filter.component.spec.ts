import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MoviesFilterComponent } from './movies-filter.component';
import { MoviesComponent } from '../movies/movies.component';

describe('MoviesFilterComponent', () => {
  let component: MoviesFilterComponent;
  let fixture: ComponentFixture<MoviesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesFilterComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [ MoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
