import { Component, OnInit } from '@angular/core';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { BitCoinService } from 'src/app/services/bit-coin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
})
export class StatisticPageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private bitCoinService: BitCoinService
  ) {}
  // view: any[] = [700, 400];
  marketPrice: {
    name: string;
    value: any;
  }[];

  confirmedTransactions: {
    name: string;
    value: any;
  }[];

  colorScheme = {
    domain: ['#c50d0d', '#8eff00', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  ngOnInit(): void {
    this.bitCoinService.getMarketPrice().subscribe((res) => {
      this.marketPrice = res;
    });

    this.bitCoinService.getConfirmedTransactions().subscribe((res) => {
      this.confirmedTransactions = res;
    });
  }
  
}
