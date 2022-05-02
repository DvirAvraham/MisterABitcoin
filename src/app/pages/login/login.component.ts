import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BitCoinService } from 'src/app/services/bit-coin.service';
import { UserService } from 'src/app/services/user.service';
import { LoginUser } from 'src/app/models/login.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  user: User;
  username: string;
  userSubscriber: Subscription;

  ngOnInit(): void {
    this.userSubscriber = this.userService.user$.subscribe(
      (user) => (this.user = user)
    );
    if (!this.user) this.router.navigateByUrl('login');
  }

  onSaveUser() {
    if (!this.username?.length) return
    this.userService.login(this.username);
    this.router.navigateByUrl('');

  }
  ngOnDestroy() {
    this.userSubscriber.unsubscribe();
  }
}
