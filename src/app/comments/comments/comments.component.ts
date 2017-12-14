import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Comment } from './comment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styles: [`
    .avatar {
      display: inline-block;
      height: 30px;
    }
    .comment-text {
      background: #eee;
      position: relative;
    }
    .comment-text::before {
      border-bottom: 10px solid #eee;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      content: '';
      display: block;
      height: 1px;
      position: absolute;
        top: -10px; left: 9px;
      width: 1px;
    }
  `]
})
export class CommentsComponent implements OnInit {
  private _commentsRef: AngularFireList<Comment>;
  comments$: Observable<Comment[]>;

  constructor(
    private db: AngularFireDatabase,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this._commentsRef = this.db.list<Comment>('comments',
      ref => ref.orderByChild('timestamp').limitToLast(15)
    );
    this.comments$ = this._commentsRef.snapshotChanges().map(
      changes => {
        return changes.map(
          c => ({ key: c.payload.key, ...c.payload.val() })
        );
      }
    );
  }

  onPostComment(data: Comment) {
    this._commentsRef.push(data);
  }

  canDeleteComment(uid: string): boolean {
    if (!this.auth.loggedInFirebase || !this.auth.userProfile) {
      return false;
    }
    return uid === this.auth.userProfile.sub;
  }

  deleteComment(key: string) {
    if (window.confirm('Are you sure you want to delete your comment?')) {
      this._commentsRef.remove(key);
    }
  }

}
