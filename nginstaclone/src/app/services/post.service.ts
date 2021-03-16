import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mypost } from '../interfaces/mypost';
import { map } from 'rxjs/operators';
import { Like } from '../interfaces/like';
import { PostedBy } from '../interfaces/posted-by';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string = 'http://localhost:4000';
  constructor(private http: HttpClient) {}

  getMyPost() {
    return this.http
      .get<GetPostResponse>(this.url + '/myposts', {
        headers: this.headers,
      })
      .pipe(map((response) => response.mypost));
  }


  getAllPostDb() {
    return this.http
      .get<AllPostResponse>(this.url + '/posts', {
        headers: this.headers,
      })
      .pipe(map((response) => response.posts));
  }

  getSinglePost(id) {
    return this.http
      .get<SinglePost>(this.url + `/post/${id}`, {
        headers: this.headers,
      })
      .pipe(map((response) => response.posts));
  }

  getLocalUSer() {
    let user = localStorage.getItem('user');
    const us = JSON.parse(user);
    return us;
  }

  private headers = { Authorization: 'Bearer ' + localStorage.getItem('jwt') };
}
interface GetPostResponse {
  mypost: Mypost[];
}

interface AllPostResponse {
  posts: Mypost[];
}

interface SinglePost {
  posts: Mypost;
}

interface SinglePost {
  _id: string;
  title: string;
  likes: Like[];
  body: string;
  photo: string;
  comments: Comment[];
  postedBy: PostedBy;
}
