import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StreakData {
  streakCount: number;
  lastReviewAt: string | null;
}

@Injectable({ providedIn: 'root' })
export class StreakService {
  private readonly apiUrl = '/api/streak';

  constructor(private http: HttpClient) {}

  getStreak(): Observable<StreakData> {
    return this.http.get<StreakData>(this.apiUrl);
  }

  updateStreak(): Observable<{ streakCount: number }> {
    return this.http.patch<{ streakCount: number }>(this.apiUrl, {});
  }
}