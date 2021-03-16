import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  hide = true;
  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getAllUser();
  }

  login() {
    this.userService.login(this.form.value).subscribe(
      (res: any) => {
        console.log(res, 'REsonse');
        console.log(res.token, 'resoisebb');
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/']);
        console.log(res.token);
      },
      ({ error }) => {
        // this.openSnackBar(error.error, 'close');
      }
    );
  }
  getErrorMessage() {
    let email = this.form.get('email');
    if (email.hasError('required')) return 'You must enter a email';

    return email.hasError('email') ? 'Not a valid email' : '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
