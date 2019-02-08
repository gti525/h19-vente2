import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutClientInformationComponent } from './checkout-client-information.component';

describe('CheckoutClientInformationComponent', () => {
  let component: CheckoutClientInformationComponent;
  let fixture: ComponentFixture<CheckoutClientInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutClientInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutClientInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
