import { Component, OnInit } from '@angular/core';
import { CommentService } from '@app/comment/comment.service';
import { Comment } from '@app/comment/comment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute, private commentService: CommentService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService.getComments(id).subscribe((comments) => (this.comments = comments));
  }
}
