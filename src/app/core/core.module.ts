import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    CommentsComponent,
    CommentFormComponent
  ],
  exports: [
    FormsModule,
    HeaderComponent,
    CommentsComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        Title,
        DatePipe
      ]
    };
  }
}
