import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCalComponent } from './user-cal.component';

describe('UserCalComponent', () => {
  let component: UserCalComponent;
  let fixture: ComponentFixture<UserCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
