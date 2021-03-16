import { Component, OnInit, Output } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Mypost } from 'src/app/interfaces/mypost';
import { retry } from 'rxjs/operators';
import { Like } from 'src/app/interfaces/like';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // @Output('posts')
  error: Response;
  posts: Mypost[] = [];
  isVisible = true;
  likes: Like[] = [];
  constructor(
    private postService: PostService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.posts = this.postService.getAllPost();
    this.postService.getAllPostDb().subscribe(
      (data) => {
        this.posts = data;
        if (data) this.isVisible = false;
      },
      (error) => {
        if (error) this.isVisible = false;
        this.error = error.statusText;
        retry(3);
      }
    );

    document.title = 'InstaClone';
  }
}
