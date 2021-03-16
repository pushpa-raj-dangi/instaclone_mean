export interface Comment {
  _id: string;
  text: string;
  postedBy: postedBy;
}

export interface postedBy {
  _id: string;
  name: string;
}
