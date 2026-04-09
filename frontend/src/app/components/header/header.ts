import { Component, inject, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarLogin } from '../avatar-login/avatar-login';
import { AuthService } from '../../services/auth.service';
import { StreakService } from '../../services/streak.service';
import { Streak } from "../streak/streak";

@Component({
  selector: 'app-header',
  imports: [AvatarLogin, Streak],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  username = '';
  streakCount = 0;
  showLogout = false;

  private router = inject(Router);
  private authService = inject(AuthService);
  private streakService = inject(StreakService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.loadStreak();
  }

  loadStreak() {
    this.streakService.getStreak().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.streakCount = data.streakCount;
          this.cdr.detectChanges();
        });
      },
      error: () => console.error('Erreur chargement streak')
    });
  }

  onHome() {
    this.router.navigateByUrl('');
  }

  onAvatarClicked() {
    this.showLogout = !this.showLogout;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}