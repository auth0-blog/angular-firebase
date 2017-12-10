import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE } from './firebase-config';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(FIREBASE),
    AngularFireDatabaseModule
  ],
  declarations: [
    CommentsComponent,
    CommentFormComponent
  ],
  exports: [
    CommentsComponent
  ]
})
export class CommentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommentsModule,
      providers: []
    };
  }
}
