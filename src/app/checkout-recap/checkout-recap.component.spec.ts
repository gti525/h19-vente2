import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutRecapComponent } from './checkout-recap.component';

describe('CheckoutRecapComponent', () => {
  let component: CheckoutRecapComponent;
  let fixture: ComponentFixture<CheckoutRecapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutRecapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
