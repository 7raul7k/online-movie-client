import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NewMovieComponent} from "./components/new-movie/new-movie.component";
import {MovieUpdateComponent} from "./components/movie-update/movie-update.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: NewMovieComponent },
  { path: 'update', component: MovieUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
