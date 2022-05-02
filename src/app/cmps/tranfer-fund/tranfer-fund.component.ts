import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import {  Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tranfer-fund',
  templateUrl: './tranfer-fund.component.html',
  styleUrls: ['./tranfer-fund.component.scss'],
})
export class TranferFundComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  @Input() contact: Contact;
  amount: number;

  ngOnInit(): void {
  }

  onTransfer() {
    if(!this.amount) return
    this.userService.transfer(this.amount, this.contact);
    this.router.navigateByUrl('');

  }
}

