import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostActivityService } from 'src/app/services/post-activity.service';
import { Like } from 'src/app/interfaces/like';
import { DialogDataExampleComponent } from '../../dialog/dialog-data-example/dialog-data-example.component';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
export interface DialogData {
  likes: Like[];
}
@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
})
export class LikeComponent implements OnInit {
  @Input('p') p;
  @Input('dts') dts;
  isLiked: boolean;
  likes: Like[] = [];
  localUser;

  constructor(
    private postService: PostService,
    private postActivity: PostActivityService,
    private dialog: MatDialog,
    private change : ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.localUser = this.postService.getLocalUSer();
    this.likes = this.p.likes;
    this.isLiked = this.likes.some((like) => like._id === this.localUser._id);
  }

  like(id) {
    this.postActivity.likePost(id).subscribe((data) => {
      this.likes = data.likes;
      this.isLiked = this.likes.some((like) => like._id === this.localUser._id);
    });
  }

  disLike(id) {
    this.postActivity.disLike(id).subscribe((data) => {
      this.likes = data.likes;
      this.isLiked = this.likes.some((like) => like._id === this.localUser._id);
    });
  }

  openDialog(likes) {
    const dialogRef = this.dialog.open(DialogDataExampleComponent, {
      width: '400px',
      data: this.likes,
    });
    console.log(likes);
  }
}
