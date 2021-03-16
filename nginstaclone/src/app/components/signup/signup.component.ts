import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  rt;
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.rt = this.route.snapshot.paramMap.get('name');
  }
  ngOnInit(): void {}

  signup() {
    this.userService.signup(this.form.value).subscribe(
      (data: any) => {
        // this.openSnackBar(data, 'close')
        this.router.navigate(['/login']);
      },
      ({ error }) => this.openSnackBar(error.error, 'close')
    );
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get name() {
    return this.form.get('name');
  }

  getEmailError() {
    if (this.email.hasError('required')) return `You must enter email`;
    return this.email.hasError('email') ? 'Enter valid email' : '';
  }
  getUserError() {
    if (this.name.hasError('required')) return `You must enter a username`;
    return this.name.hasError('minlength') ? 'Name should be minimum 3 letter.' : '';
  }

  getPasswordError() {
    if (this.password.hasError('required')) return `You must enter a password`;
    return this.password.hasError('minlength')
      ? 'Enter strong password'
      : '';
  }

  private showError = (name: string) => {
    if (this.password.hasError('required')) return `You must enter a ${name}`;
  };

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass:['warning']
    });
  }
}
