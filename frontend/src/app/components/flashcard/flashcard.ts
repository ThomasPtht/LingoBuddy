import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, NgZone, inject } from '@angular/core';
import { VocabularyService } from '../../services/vocabulary.service';
import { VocabularyItem } from '../../models/vocabulary.model';
import { StreakService } from '../../services/streak.service';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-flashcard',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './flashcard.html',
  styleUrl: './flashcard.scss',
})
export class Flashcard {
  isFlipped = false;
  flashcards: VocabularyItem[] = [];
  currentIndex = 0;
  errorMsg = '';
  isLoading = true;

  private toastr = inject(ToastrService);

  private cardsReviewed = 0;
  private readonly DAILY_GOAL = 10;
  private streakUpdated = false;

  private router = inject(Router);
  private vocabService = inject(VocabularyService);
  private streakService = inject(StreakService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  ngOnInit() {
    this.vocabService.getAll().subscribe({
      next: (allCards) => {
        this.ngZone.run(() => {
          if (!allCards || allCards.length === 0) {
            this.errorMsg = 'Aucune carte disponible.';
          } else {
            this.flashcards = this.pickRandomFlashcards(allCards, 10);
            this.currentIndex = 0;
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.errorMsg = 'Erreur lors du chargement des cartes.';
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  private checkDailyGoal() {
    if (this.cardsReviewed < this.DAILY_GOAL) {
      this.cardsReviewed++;
      if (this.cardsReviewed === this.DAILY_GOAL && !this.streakUpdated) {
        this.streakUpdated = true;
        this.streakService.updateStreak().subscribe();
        this.toastr.success('Session is complete ! Keep it up like this !');
      }
    }
  }

  pickRandomFlashcards(cards: VocabularyItem[], count: number): VocabularyItem[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  onHome() {
    this.router.navigateByUrl('');
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  shuffleFlashcards() {
    for (let i = this.flashcards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.flashcards[i], this.flashcards[j]] = [this.flashcards[j], this.flashcards[i]];
    }
  }

  showNewCard() {
    this.isFlipped = false;
    this.checkDailyGoal();
    if (this.flashcards.length > 1) {
      this.currentIndex = (this.currentIndex + 1) % this.flashcards.length;
    }
  }

  markMastered() {
    this.checkDailyGoal();
    this.flashcards.splice(this.currentIndex, 1);
    this.isFlipped = false;
    this.currentIndex = this.flashcards.length === 0 ? 0 : this.currentIndex % this.flashcards.length;
  }

  get currentFlashcard(): VocabularyItem | null {
    if (this.cardsReviewed >= this.DAILY_GOAL) return null;
    return this.flashcards[this.currentIndex];
  }

  // Ajouté pour la barre de progression
  get progress(): number {
    return Math.min(this.cardsReviewed / this.DAILY_GOAL, 1);
  }

  get cardsReviewedPublic(): number {
    return this.cardsReviewed;
  }

  get dailyGoalPublic(): number {
    return this.DAILY_GOAL;
  }

  onDeleteById(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.vocabService.deleteById(id).subscribe({
        next: () => {
        this.flashcards = this.flashcards.filter(card => card.id !== id);
        this.isFlipped = false;
        this.currentIndex = this.flashcards.length === 0 ? 0 : this.currentIndex % this.flashcards.length;
        this.cdr.detectChanges();
        this.toastr.success('Item deleted successfully');
        },
        
        error: (err) => {
          console.error('Error deleting item:', err);
          this.toastr.error('Failed to delete item');
        }
      });
    }
  }
}