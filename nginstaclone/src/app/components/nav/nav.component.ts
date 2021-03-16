import { Component, OnInit, Inject } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { CreatePostComponent } from 'src/app/user/create-post/create-post.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  myControl = new FormControl();
  options;
  filteredOptions;
  user;
  loggedIn: boolean = false;
  constructor(
    private postService: PostService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.loggedIn = this.userService.isLoggedIn();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.user = this.userService.getAllUser();
    this.loggedIn = this.userService.isLoggedIn();
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    let posts = this.userService.getAllUser().subscribe((data) => {
      this.user = data;
      // let don = (opt) => opt.user.name.toLowerCase().indexOf(filterValue) === 0;
      let don;
      return don;
    });
  }

  logout() {
    this.userService.logOut();
    this.loggedIn = this.userService.isLoggedIn();
  }

  openDialog(): void {
    this.dialog.open(CreatePostComponent);
  }


}
