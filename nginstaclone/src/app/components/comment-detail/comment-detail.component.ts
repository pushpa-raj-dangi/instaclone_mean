import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Mypost } from 'src/app/interfaces/mypost';
import { UserService } from 'src/app/services/user.service';
import { PostedBy } from 'src/app/interfaces/posted-by';
import { Like } from 'src/app/interfaces/like';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css'],
})
export class CommentDetailComponent implements OnInit {
  post: Mypost;
  comments;
  localUser;
  data: any;
  postedBy: PostedBy;
  likes: Like[] = [];
  postId: string;
  isVisible: boolean = true;
  constructor(
    private router: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private route: Router
  ) {
    route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.postId = this.router.snapshot.paramMap.get('postId');
    this.getSingle(this.postId);

  }

  ngOnInit(): void {
    this.localUser = this.userService.getLocatoStorageUser();
    this.getSingle(this.postId);

  }


  getSingle(id) {
    this.postService.getSinglePost(id).subscribe((data) => {
      if (data) {
        this.isVisible = false;
      }
      this.post = data;
      this.comments = data.comments;
      this.postedBy = data.postedBy;
      this.likes = data.likes;
    });
  }
}
