import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarLogin } from './avatar-login';

describe('AvatarLogin', () => {
  let component: AvatarLogin;
  let fixture: ComponentFixture<AvatarLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return initial from username', () => {
    component.username = 'John Doe';
    expect(component.initial).toBe('J');
  });
});
