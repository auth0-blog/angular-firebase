import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Comment } from './comment.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styles: [`
    .avatar {
      border-radius: 100px;
      display: inline-block;
      height: 20px;
    }
  `]
})
export class CommentsComponent implements OnInit {
  @Input() rank: string | number;
  listName: string;
  private _commentsRef: AngularFireList<Comment>;
  comments$: Observable<Comment[]>;

  constructor(
    private db: AngularFireDatabase,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.listName = this.rank ? `comments-${this.rank}` : 'comments-main';
    this._commentsRef = this.db.list<Comment>(
      this.listName,
      ref => ref.orderByChild('timestamp').limitToLast(15)
    );
    this.comments$ = this._commentsRef.valueChanges();
  }

  onPostComment(data: Comment) {
    this._commentsRef.push(data);
  }

}
