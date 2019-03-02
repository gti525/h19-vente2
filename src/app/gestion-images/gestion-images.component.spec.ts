import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionImagesComponent } from './gestion-images.component';

describe('GestionImagesComponent', () => {
  let component: GestionImagesComponent;
  let fixture: ComponentFixture<GestionImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
