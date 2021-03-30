import { Component, OnInit } from '@angular/core';
import { CommentService } from '@app/comment/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '@app/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  comments: Comment[];

  constructor(private route: ActivatedRoute, private commentService: CommentService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.commentService.getComments(id).subscribe((comments) => (this.comments = comments));
  }

  addComment(text: string): void {
    text = text.trim();
    if (!text) {
      return;
    }
    const assetId = this.route.snapshot.paramMap.get('id');
    const date = new Date();
    const createdAt = date.getTime();
    this.commentService
      .addComment({ assetId, text, createdAt } as Comment)
      .subscribe((comments) => (this.comments = comments));
  }
}
