import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { VocabularyService } from '../../services/vocabulary.service';
import { VocabularyStats } from '../../models/vocabulary.model';

@Component({
  selector: 'app-collection',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './collection.html',
  styleUrl: './collection.scss',
})
export class Collection implements OnInit {
  private router = inject(Router);
  private vocabService = inject(VocabularyService);

  stats: VocabularyStats | null = null;

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.vocabService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('erreur stats:', err);
      },
    });
  }

  onFlashcards() {
    this.router.navigateByUrl('flashcards');
  }
}