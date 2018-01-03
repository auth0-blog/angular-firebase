import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Comment } from './../../comment';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html'
})
export class CommentFormComponent implements OnInit {
  @Output() postComment = new EventEmitter<Comment>();
  commentForm: Comment;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this._newComment();
  }

  private _newComment() {
    this.commentForm = new Comment(
      this.auth.userProfile.name,
      this.auth.userProfile.sub,
      this.auth.userProfile.picture,
      '',
      null);
  }

  onSubmit() {
    this.commentForm.timestamp = new Date().getTime();
    this.postComment.emit(this.commentForm);
    this._newComment();
  }

}
