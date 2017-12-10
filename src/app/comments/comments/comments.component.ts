import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Comment } from './comment.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styles: []
})
export class CommentsComponent implements OnInit {
  @Input() rank: string | number;
  listName: string;
  commentsRef: AngularFireList<Comment>;
  comments$: Observable<Comment[]>;

  constructor(
    private db: AngularFireDatabase,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.listName = this.rank ? `comments-${this.rank}` : 'comments-main';
    this.commentsRef = this.db.list(this.listName);
    this.comments$ = this.commentsRef.valueChanges();
  }

  onPostComment(data: Comment) {
    this.commentsRef.push(data);
  }

}
