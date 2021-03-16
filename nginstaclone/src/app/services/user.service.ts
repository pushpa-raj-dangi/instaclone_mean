import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';
import { Mypost } from '../interfaces/mypost';
import { Follower } from '../interfaces/follower';
import { Following } from '../interfaces/following';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:4000';
  constructor(private http: HttpClient) {
    this.isLoggedIn();
  }

  signup(value) {
    console.log(value);
    return this.http.post(this.url + '/signup', value, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  login(value) {
    return this.http.post(this.url + '/signin', value);
  }

  getUser(id) {
    return this.http
      .get<SingleUserResponse>(this.url + `/user/${id}`, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  getAllUser() {
    return this.http
      .get<AllUserResponse>(this.url + '/users', {
        headers: this.headers,
      })
      .pipe(map((response) => response.user));
  }

  getUserById(id) {
    return this.http
      .get<UserResponse>(this.url + '/userBy/' + id, {
        headers: this.headers,
      })
      .pipe(map((response) => response.user));
  }

  follow(userId) {
    return this.http.put<FollowResponse>(
      this.url + '/follow',
      JSON.stringify({ followId: userId }),
      { headers: this.headers }
    );
  }

  unFollow(userId) {
    return this.http.put<FollowResponse>(
      this.url + '/unfollow',
      JSON.stringify({ unfollowId: userId }),
      { headers: this.headers }
    );
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
  });

  decodeToken() {
    let decoded = jwt_decode(localStorage.getItem('jwt'));
    console.log(decoded);
  }

  isLoggedIn() {
    return this.getLocatoStorageUser() !== null;
  }

  getLocatoStorageUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  logOut() {
    localStorage.clear();
  }
}

interface SingleUserResponse {
  user: User;
  posts: Mypost[];
}

interface AllUserResponse {
  user: User[];
}

interface UserResponse {
  user: User;
}

interface FollowResponse {
  result: MyFollow;
}

interface MyFollow {
  email: string;
  followers: Follower[];
  following: Following[];
  name: string;
  _id: string;
}
