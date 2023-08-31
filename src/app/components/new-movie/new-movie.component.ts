import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {Message} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit, OnDestroy {

  nameValue = '';
  genreValue = '';
  yearValue = Number("");
  ratingValue = "";
  directorValue = "";

  mesagges: Message[] =[];

  constructor(private movieService: MovieService,private router: Router) {
  }

  ngOnInit(): void {

    this.mesagges=[{severity:'success',summary:'Success',detail:'Movie was added'}];


  }

  ngOnDestroy(): void {
  }

  save() {

    this.checkValidation();

    if(this.mesagges.length == 0){

      let movieDTO = {
        name: this.nameValue,
        genre: this.genreValue,
        year: this.yearValue,
        rating: this.ratingValue,
        director: this.directorValue
      };

      this.movieService.addMovie(movieDTO).subscribe({
        next: (data) => {
          this.mesagges.push({severity:'success',summary:'Success',detail:'Movie was added'});

          this.router.navigate(['/']);

        },
        complete: () => {

        },error: (err) => {
          alert(err);
        }
      });
    }
  }

  checkValidation(){

    this.mesagges = [];
    if(this.nameValue == ''){
      this.mesagges.push({severity:'error',summary:'Error',detail:'Name is required'});
    }
    if(this.genreValue == ''){
      this.mesagges.push({severity:'error',summary:'Error',detail:'Genre is required'});
    }
    if(this.yearValue == Number("")){
      this.mesagges.push({severity:'error',summary:'Error',detail:'Year is required'});
    }
    if(this.ratingValue == ''){
      this.mesagges.push({severity:'error',summary:'Error',detail:'Rating is required'});
    }
    if(this.directorValue == ''){
      this.mesagges.push({severity:'error',summary:'Error',detail:'Director is required'});
    }
  }
}
