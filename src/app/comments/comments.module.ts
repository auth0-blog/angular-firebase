import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { environment } from './../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule, // Import FormsModule and Loading component
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
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
