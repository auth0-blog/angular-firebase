import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogsComponent } from './dogs/dogs.component';
import { Routes, RouterModule } from '@angular/router';

const DOGS_ROUTES: Routes = [
  {
    path: '',
    component: DogsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DOGS_ROUTES)
  ],
  declarations: [
    DogsComponent
  ],
  exports: [
    DogsComponent
  ]
})
export class DogsModule { }
