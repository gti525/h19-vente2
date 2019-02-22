import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCreditComponent } from './checkout-credit.component';

describe('CheckoutCreditComponent', () => {
  let component: CheckoutCreditComponent;
  let fixture: ComponentFixture<CheckoutCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
