import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE } from './firebase-config';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(FIREBASE),
    AngularFireAuthModule,
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
export class CommentsModule { }
