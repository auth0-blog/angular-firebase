import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { environment } from './../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    CoreModule, // Import FormsModule and Loading component
    AngularFireModule.initializeApp(environment.firebase),
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
