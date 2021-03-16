import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(route, state: RouterStateSnapshot) {
    let user = this.userService.getLocatoStorageUser();
    if (user) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
