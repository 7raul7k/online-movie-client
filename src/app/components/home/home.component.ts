import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {MoviesDTO} from "../../models/api/MoviesDTO";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {LoadingState} from "../../models/LoadingState.enum";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{

  movies: MoviesDTO[] = [];
  loadingState$ : Subject<LoadingState> = this.movieService.loadingStateSubject$;
  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.movieService.getAllMovies().subscribe(
      {
        next: (data) => {
          this.movies = data;
          this.movieService.loadingStateSubject$.next(LoadingState.Success);
        },
        error: () => {
          this.movieService.loadingStateSubject$.next(LoadingState.Error);
        },
        complete: () => {

        }
      });
  }

  constructor(private movieService: MovieService,private router: Router) {
  }

  navigateToUpdate(movie:any) {
    this.router.navigate(['/update', movie.id])
  }

  protected readonly LoadingState = LoadingState;

}
