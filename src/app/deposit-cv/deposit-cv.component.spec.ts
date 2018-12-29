import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositCvComponent } from './deposit-cv.component';

describe('DepositCvComponent', () => {
  let component: DepositCvComponent;
  let fixture: ComponentFixture<DepositCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
