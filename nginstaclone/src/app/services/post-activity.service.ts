import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mypost } from '../interfaces/mypost';
import { JsonPipe } from '@angular/common';
import { Like } from '../interfaces/like';
import { PostedBy } from '../interfaces/posted-by';
import { postedBy, Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class PostActivityService {
  private url: string = 'http://localhost:4000';
  constructor(private http: HttpClient) {}

  deletePost(id) {
    return this.http.delete(this.url + `/deletepost/${id}`, {
      headers: this.headers,
    });
  }

  createPost(data) {
    return this.http.post(this.url + '/createpost',JSON.stringify(data), { headers: this.headers });
  }

  likePost(id) {
    return this.http.put<Mypost>(
      this.url + '/like',
      JSON.stringify({ postId: id }),
      {
        headers: this.headers,
      }
    );
  }

  disLike(id) {
    return this.http.put<Mypost>(
      this.url + '/unlike',
      JSON.stringify({ postId: id }),
      {
        headers: this.headers,
      }
    );
  }

  comment(postId, text) {
    return this.http.put<SinglePost>(
      this.url + '/comment',
      JSON.stringify({ postId: postId, text }),
      {
        headers: this.headers,
      }
    );
  }

  private headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
  };
}

interface SinglePost {
  _id: string;
  title: string;
  likes: Like[];
  body: string;
  photo: string;
  comments: Comment[];
  postedBy: postedBy;
}
