import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityruleComponent } from './cityrule.component';

describe('CityruleComponent', () => {
  let component: CityruleComponent;
  let fixture: ComponentFixture<CityruleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityruleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
