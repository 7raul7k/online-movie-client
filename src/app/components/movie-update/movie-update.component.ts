import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {MoviesDTO} from "../../models/api/MoviesDTO";
import {Message} from "primeng/api";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit,OnDestroy{

  movie:MoviesDTO ={

    name:"",
    genre:"",
    year:0,
    rating:"",
    director:""
  }

  id = 10;

  messages: Message[] =[];
  constructor(private movieService : MovieService,private router: Router, private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.messages = [{ severity: 'success', summary: 'Success', detail:  'Message Content' },
      { severity: 'error', summary: 'Error', detail: 'Message Content' }];

    this.route.params.subscribe({
      next:(params:Params)=>{
        this.id=params['id'];
        this.movieService.getMovieById(this.id).subscribe({
          next:(data)=>{
            this.movie=data;
          },
          error:(err)=> {

            console.log(err);
          }

        });
      }
    });
  }

  updateMovie() {

    this.movieService.updateMovie(this.movie).subscribe({
      next: (data) => {
        this.messages.push({severity: 'success', summary: 'Success', detail: 'Movie was updated'})

        this.router.navigate(['/']);


      },
      error: (err) => {
        console.log(err)  }
    });
  }






}
