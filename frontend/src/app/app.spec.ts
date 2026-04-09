import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Router } from '@angular/router';

describe('App', () => {
  let mockRouter: { url: string };

  beforeEach(async () => {
    mockRouter = { url: '/' };
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show header for non-login/register routes', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    mockRouter.url = '/home';
    expect(app.showHeader).toBe(true);
    mockRouter.url = '/dashboard';
    expect(app.showHeader).toBe(true);
  });

  it('should not show header for /login', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    mockRouter.url = '/login';
    expect(app.showHeader).toBe(false);
    mockRouter.url = '/login/extra';
    expect(app.showHeader).toBe(false);
  });

  it('should not show header for /register', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    mockRouter.url = '/register';
    expect(app.showHeader).toBe(false);
    mockRouter.url = '/register/extra';
    expect(app.showHeader).toBe(false);
  });
});
