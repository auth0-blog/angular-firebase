import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogsComponent } from './dogs/dogs.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [
    DogsComponent
  ],
  exports: [
    DogsComponent
  ]
})
export class DogsModule { }
