import { Like } from './like';
import { PostedBy } from './posted-by';

export interface Mypost {
  _id: string;
  title: string;
  body: string;
  photo?: string;
  postedBy: PostedBy;
  postedsBy?: string;
  likes: Like[];
  comments: Comment[];
  followers: Follower[];
  followings: Following[];
}

interface Follower {
  _id: string;
  name: string;
}

interface Following {
  _id: string;
  name: string;
}
