import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {User} from '../../models/user.model'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  user : User  = undefined

  constructor(
    private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(
    (user) => (this.user = user));
  }

  logout(){
    this.userService.logout()
  }

}
