import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilletsComponent } from './billets.component';

describe('BilletsComponent', () => {
  let component: BilletsComponent;
  let fixture: ComponentFixture<BilletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
