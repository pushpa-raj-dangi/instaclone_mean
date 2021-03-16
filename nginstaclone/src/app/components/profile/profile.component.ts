import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Mypost } from 'src/app/interfaces/mypost';
import { Follower } from 'src/app/interfaces/follower';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile;
  posts: Mypost[] = [];
  following: boolean;
  user: User;
  loggedInId;
  followers:Follower[]=[];
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.profile = this.route.snapshot.paramMap.get('id');
    this.getProfile(this.profile);
    let user = this.userService.getLocatoStorageUser();
    this.loggedInId = user._id;
  }

  private getProfile(id) {
    this.userService.getUser(id).subscribe((data) => {
      this.posts = data.posts;
      this.user = data.user;
      document.title = this.user.name;
      this.followers =[...this.followers, data.user.followers]
    });
  }


}
