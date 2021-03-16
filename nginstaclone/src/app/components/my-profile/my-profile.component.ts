import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Mypost } from '../../interfaces/mypost';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  following: boolean;
  profile;
  user: User;
  posts: Mypost[] = [];
  id;
  constructor(
    private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {
    this.id = this.postService.getLocalUSer()._id;
    this.userService.getUser(this.id).subscribe(
      (data) => {
        this.posts = data.posts;
        this.user = data.user
      },
      ({ error }) => console.log('Cannot fetch data')
    );
  }
  onFollowing() {
    this.following = !this.following;
  }
}
