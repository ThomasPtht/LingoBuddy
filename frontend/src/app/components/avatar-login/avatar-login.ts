import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar-login',
  imports: [],
  templateUrl: './avatar-login.html',
  styleUrl: './avatar-login.scss',
})
export class AvatarLogin {
  @Input() username?: string;
  @Output() avatarClick = new EventEmitter<void>();

  get initial(): string {
    return this.username?.[0]?.toUpperCase() ?? '?';
  }

  onAvatarClick() {
    this.avatarClick.emit();
  }
}