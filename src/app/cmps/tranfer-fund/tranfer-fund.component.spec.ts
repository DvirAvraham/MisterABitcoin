import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranferFundComponent } from './tranfer-fund.component';

describe('TranferFundComponent', () => {
  let component: TranferFundComponent;
  let fixture: ComponentFixture<TranferFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranferFundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranferFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
