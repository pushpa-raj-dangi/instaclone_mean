import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { Like } from 'src/app/interfaces/like';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-data-example',
  templateUrl: './dialog-data-example.component.html',
  styleUrls: ['./dialog-data-example.component.css'],
})
export class DialogDataExampleComponent implements OnInit {
  likes;
  loggedInd;
  constructor(
    private postService: PostService,
    public dialogRef: MatDialogRef<DialogDataExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggedInd = this.userService.getLocatoStorageUser();
  }

  onclose(){
    this.dialogRef.close()
  }
}

interface DialogData {
  likes: Like[];
}
