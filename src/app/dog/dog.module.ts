import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogComponent } from './dog/dog.component';
import { Routes, RouterModule } from '@angular/router';

const DOG_ROUTES: Routes = [
  {
    path: ':rank',
    component: DogComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DOG_ROUTES)
  ],
  declarations: [
    DogComponent
  ]
})
export class DogModule { }
