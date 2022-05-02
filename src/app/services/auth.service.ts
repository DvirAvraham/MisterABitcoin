import { Injectable } from '@angular/core';
import {UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private userService: UserService 
  ) {}
  
  isLoggedIn = null;
  
  checkIsLoggedIn(): boolean {
    this.isLoggedIn = this.userService.getCurrUser();
    return  !!this.isLoggedIn.name
  }

  //   }
}
