import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Follower } from 'src/app/interfaces/follower';
import { Following } from 'src/app/interfaces/following';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  users: User[] = [];
  followers: Follower[] = [];
  following: Following[] = [];
  localUser;
  constructor(
    private postService: PostService,
    private usrService: UserService
  ) {}

  ngOnInit(): void {
    this.localUser = this.postService.getLocalUSer();
    this.usrService.getAllUser().subscribe((data) => {
      this.users = data;
    });
    this.generateRandom();
  }

  generateRandom() {
    return Math.floor(Math.random() * 10)+1;
  }

  // getSingle()
}
