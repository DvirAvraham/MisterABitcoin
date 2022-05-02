import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BitCoinService } from 'src/app/services/bit-coin.service';
import { UserService } from 'src/app/services/user.service';
import { LoginUser } from 'src/app/models/login.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private bitCoinService: BitCoinService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  user: User;
  bitcoin: any;
  loginUser: any;
  username: string;
  userSubscriber: Subscription;
  userMoves: any

  userLoged$: Observable<LoginUser[]>;

  ngOnInit(): void {
    this.user = this.userService.getCurrUser();
    if (!this.user) {
      this.userSubscriber = this.userService.user$.subscribe(
        (user) => (this.user = user)
      );
    }
     this.bitCoinService.getRate().subscribe(res=>this.bitcoin = res);
    if (!this.user) this.router.navigateByUrl('login');
    this.userMoves = this.user.moves.splice(0,3)
  }

  get btc() {
    return (this.user.coins / this.bitcoin).toLocaleString(undefined, {maximumFractionDigits: 2})
  }
  



  // ngOnDestroy() {
  //   this.userSubscriber.unsubscribe();
  // }
}
