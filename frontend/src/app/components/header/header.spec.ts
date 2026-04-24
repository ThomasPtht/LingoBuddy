import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { StreakService } from '../../services/streak.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: StreakService,
          useValue: { getStreak: () => of({ streakCount: 3, lastReviewAt: null }) },
        },
        {
          provide: AuthService,
          useValue: { getUsername: () => 'Thomas' },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: () => {} },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('LingoBuddy');
  });

  it('should render avatar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-avatar-login')).toBeTruthy();
  });

  it('should render streak component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-streak')).toBeTruthy();
  });
});
