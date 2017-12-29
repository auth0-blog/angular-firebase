import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Comment } from './../comment';
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
export class CommentsComponent {
  private _commentsCollection: AngularFirestoreCollection<Comment>;
  comments$: Observable<Comment[]>;

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService
  ) {
    // Get latest 15 comments from Firestore, ordered by timestamp
    this._commentsCollection = afs.collection<Comment>(
      'comments',
      ref => ref.orderBy('timestamp').limit(15)
    );
    // Add Firestore ID to comments
    // The ID is necessary to delete comments
    this.comments$ = this._commentsCollection.snapshotChanges().map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  onPostComment(comment: Comment) {
    // Unwrap the Comment instance to an object for Firestore
    // See https://github.com/firebase/firebase-js-sdk/issues/311
    const commentObj = <Comment>comment.getObj;
    this._commentsCollection.add(commentObj);
  }

  canDeleteComment(uid: string): boolean {
    if (!this.auth.loggedInFirebase || !this.auth.userProfile) {
      return false;
    }
    return uid === this.auth.userProfile.sub;
  }

  deleteComment(id: string) {
    // Delete comment with confirmation prompt first
    if (window.confirm('Are you sure you want to delete your comment?')) {
      const thisDoc: AngularFirestoreDocument<Comment> = this.afs.doc<Comment>(`comments/${id}`);
      thisDoc.delete();
    }
  }

}
