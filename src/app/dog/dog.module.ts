import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogComponent } from './dog/dog.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [
    DogComponent
  ]
})
export class DogModule { }
