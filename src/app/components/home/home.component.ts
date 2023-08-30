import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {MoviesDTO} from "../../models/api/MoviesDTO";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{

  movies: MoviesDTO[] = [];
  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.movieService.getAllMovies().subscribe(
      {
        next: (data) => {
          this.movies = data;
        },
        error: () => {
        },
        complete: () => {

        }
      });
  }

  constructor(private movieService: MovieService) {
  }

}
