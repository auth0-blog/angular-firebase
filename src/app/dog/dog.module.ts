import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { DogComponent } from './dog/dog.component';

const DOG_ROUTES: Routes = [
  {
    path: ':rank',
    component: DogComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(DOG_ROUTES)
  ],
  declarations: [
    DogComponent
  ]
})
export class DogModule { }
