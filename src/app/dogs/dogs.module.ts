import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { CommentsModule } from '../comments/comments.module';
import { DogsComponent } from './dogs/dogs.component';

const DOGS_ROUTES: Routes = [
  {
    path: '',
    component: DogsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule, // Import Loading component
    RouterModule.forChild(DOGS_ROUTES),
    CommentsModule
  ],
  declarations: [
    DogsComponent
  ],
  exports: [
    DogsComponent
  ]
})
export class DogsModule { }
