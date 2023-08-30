import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {MoviesDTO} from "../../models/api/MoviesDTO";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url ="http://localhost:8080/api/v1/movie"

  constructor(private http : HttpClient) { }


  getAllMovies(){
    return this.http.get<MoviesDTO[]>(this.url + "/allMovies").pipe(catchError(this.handleError));
  }

  addMovie(movieDTO : MoviesDTO) : Observable<String>{
    return this.http.post<String>(this.url + "/addMovie",movieDTO).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(()=>'Something bad happened; please try again later.');
  };
}
