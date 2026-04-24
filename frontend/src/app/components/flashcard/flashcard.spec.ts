import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Flashcard } from './flashcard';
import { VocabularyService } from '../../services/vocabulary.service';
import { StreakService } from '../../services/streak.service';
import { Router } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

@Component({ selector: 'lucide-icon', template: '', standalone: true })
class MockLucideIconComponent {}

describe('Flashcard', () => {
  let component: Flashcard;
  let fixture: ComponentFixture<Flashcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flashcard],
      providers: [
        provideAnimations(),
        provideToastr(),
        {
          provide: VocabularyService,
          useValue: { getAll: () => of([]) },
        },
        {
          provide: StreakService,
          useValue: { updateStreak: () => of({ streakCount: 0 }) },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: () => {} },
        },
      ],
    })
      .overrideComponent(Flashcard, {
        set: { imports: [CommonModule, MockLucideIconComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Flashcard);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
