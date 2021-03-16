import { Component, OnInit, Input, Output } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Like } from 'src/app/interfaces/like';
import { FormGroup, FormControl } from '@angular/forms';
import { PostActivityService } from 'src/app/services/post-activity.service';
import { Comment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Output('commenting') commenting;
  likes: Like[] = [];
  @Input('post') post;
  @Input('p') p;
  @Input("comments") comments:Comment[]=[];
  thiscomments:Comment[]=[];
  signUser;
  form = new FormGroup({
    text: new FormControl(''),
  });
  constructor(
    private router: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private postActivity: PostActivityService
  ) {}

  ngOnInit(): void {
    this.signUser = this.userService.getLocatoStorageUser();
    this.thiscomments = this.p.comments;
  }

  onComment(id) {
    this.postActivity
      .comment(id, this.form.get('text').value)
      .subscribe((data) => {
        this.thiscomments = data.comments;
      });
    this.form.reset();
  }
}
