import { Component, Output } from '@angular/core';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'InstaClone';
  @Output('posts') posts;
  loggedIn: boolean = false;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loggedIn = true;
    }
  }
  isLoggedIn() {
    return localStorage.getItem('user') !== null;
  }
}
