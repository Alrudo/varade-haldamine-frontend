import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '@app/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'comment';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getComments(id: string): Observable<Comment[]> {
    const url = `${this.url}/${id}`;
    return this.http.get<Comment[]>(url);
  }

  addComment(comment: Comment): Observable<Comment[]> {
    return this.http.post<Comment[]>(this.url, comment, this.httpOptions);
  }
}
