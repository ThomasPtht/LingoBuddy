import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-streak',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './streak.html',
  styleUrl: './streak.scss',
})
export class Streak {
  @Input() streakCount = 0;

  get streakEmoji(): string {
    if (this.streakCount >= 30) return '🔥';
    if (this.streakCount >= 20) return '🚀';
    if (this.streakCount >= 10) return '⚡';
    if (this.streakCount >= 5)  return '💪';
    return '🥲';
  }

  get nextMilestone(): number {
    if (this.streakCount < 5)  return 5;
    if (this.streakCount < 10) return 10;
    if (this.streakCount < 20) return 20;
    if (this.streakCount < 30) return 30;
    return this.streakCount + 10;
  }

  get previousMilestone(): number {
    if (this.streakCount < 5)  return 0;
    if (this.streakCount < 10) return 5;
    if (this.streakCount < 20) return 10;
    return 20;
  }

  get progressPercent(): number {
    const prev = this.previousMilestone;
    return Math.min(((this.streakCount - prev) / (this.nextMilestone - prev)) * 100, 100);
  }

  get streakDays(): { index: number; done: boolean }[] {
    const total = this.nextMilestone - this.previousMilestone;
    const done = this.streakCount - this.previousMilestone;
    return Array.from({ length: total }, (_, i) => ({ index: i, done: i < done }));
  }
}