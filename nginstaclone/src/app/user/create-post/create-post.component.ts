import { Component, OnInit } from '@angular/core';
import { PostActivityService } from 'src/app/services/post-activity.service';
import {
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupName,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  url;
  loder: boolean = undefined;
  d = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl(''),
    image: new FormControl(''),
  });
  constructor(
    private postActivity: PostActivityService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  createPost() {
    this.postActivity.createPost(this.d.value).subscribe((data) => {
      console.log('data', data);
    });
  }

  upload(e) {
    this.loder = true;
    const dta = new FormData();
    dta.append('file', e.target.files[0]);
    dta.append('upload_preset', 'instanepal');
    dta.append('cloud_name', 'instanepal1');
    fetch('https://api.cloudinary.com/v1_1/instanepal1/image/upload', {
      method: 'post',
      body: dta,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          this.loder = false;
        }
        this.url = data.url;
        this.d.get('image').setValue(this.url);
        console.log(this.d);
      })
      .catch((error) => console.log(error));
  }

  close() {
    this.dialog.closeAll();
  }

  twoEvent() {
    this.createPost();
    this.close();
  }
}
