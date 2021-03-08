import { Injectable } from '@angular/core';
import { Comment } from '@app/comment/comment';
import { COMMENTS } from '@app/comment/mock-coments';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}

  getComments(id: number): Observable<Comment[]> {
    let comments: Comment[] = [];
    for (let comment of COMMENTS) {
      if (comment.id == id) {
        comments.push(comment);
      }
    }
    return of(comments);
  }
}
