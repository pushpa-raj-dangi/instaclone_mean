import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Follower } from 'src/app/interfaces/follower';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {
  @Input('user') user;
  @Input('posts') posts;
  following: boolean;
  id;
  followers: Follower[] = [];
  userId;
  constructor(
    private userService: UserService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let user = this.userService.getLocatoStorageUser();
    this.id = this.router.snapshot.paramMap.get('id');
    this.userId = user._id;
    this.following = this.user.followers.includes(this.userId);
    this.followers = this.user.followers;
  }

  follow() {
    console.log('follow');
    this.userService.follow(this.id).subscribe((data) => {
      this.followers = data.result.followers;
      this.following = this.followers.includes(this.userId);
      this.following = !this.following;
    });
  }
  unFollow() {
    console.log('unFollow');
    this.userService.unFollow(this.id).subscribe((data) => {
      this.followers = data.result.followers;
      this.following = this.followers.includes(this.userId);
      !this.following == this.following;
    });
  }
}
