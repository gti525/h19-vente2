import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsApiComponent } from './docs-api.component';

describe('DocsApiComponent', () => {
  let component: DocsApiComponent;
  let fixture: ComponentFixture<DocsApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
