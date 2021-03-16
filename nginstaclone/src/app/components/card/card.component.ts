import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
} from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataExampleComponent } from '../dialog/dialog-data-example/dialog-data-example.component';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PostActivityService } from 'src/app/services/post-activity.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input('p') p;
  @Input('error') error;
  @Input('commenting') commenting;
  editMode;
  signUser;
  isLoggedIn;
  comments: Comment[] = [];

  constructor(
    private postService: PostService,
    public dialog: MatDialog,
    private userService: UserService,
    private fb: FormBuilder,
    private postActivity: PostActivityService
  ) {}

  ngOnInit(): void {
    this.signUser = this.userService.getLocatoStorageUser();
  }

  delete(id) {
    this.postActivity.deletePost(id).subscribe(data=>{
      console.log("this.data",data)
    });
  }



  getDay() {
    let date = new Date().getSeconds();
    switch (date) {
      case 60:
        return ' 1 min ago';
        break;
      default:
        return date + ' second ago';
        break;
    }
  }
}
