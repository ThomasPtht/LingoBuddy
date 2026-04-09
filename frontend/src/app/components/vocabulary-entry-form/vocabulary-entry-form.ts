import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { VocabularyService } from '../../services/vocabulary.service';

@Component({
  selector: 'app-vocabulary-entry-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vocabulary-entry-form.html',
  styleUrl: './vocabulary-entry-form.scss',
})
export class VocabularyEntryForm implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private vocabService = inject(VocabularyService);


  private readonly apiUrl = '/api'; // ← proxy

  isAnalyzing = false;
  isChecking = false;
  checkResult: { isCorrect: boolean; feedback: string; correctedSentence: string } | null = null;

 vocabularyForm = new FormGroup({
  expression: new FormControl('', { nonNullable: true, validators: Validators.required }),
  translation: new FormControl('', { nonNullable: true, validators: Validators.required }),
  contextSentence: new FormControl('', { nonNullable: true, validators: Validators.required }),
  category: new FormControl('', { nonNullable: true, validators: Validators.required }),
});

  ngOnInit() {
    this.vocabularyForm.get('contextSentence')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(val => !!val && val.length > 5)
    ).subscribe(() => {
      this.onCheckSentence();
    });
  }

  onExpressionBlur() {
    const expression = this.vocabularyForm.get('expression')?.value;
    if (!expression) return;

    this.isAnalyzing = true;
    this.checkResult = null;

    this.http.get<{ translation: string; category: string }>(
      `${this.apiUrl}/gemini/analyze?expression=${encodeURIComponent(expression)}`
    ).subscribe({
      next: (result) => {
        this.vocabularyForm.patchValue({
          translation: result.translation,
          category: result.category,
        });
        this.isAnalyzing = false;
      },
      error: () => {
        this.toastr.error('Could not analyze expression', 'Error');
        this.isAnalyzing = false;
      }
    });
  }

  onCheckSentence() {
    const expression = this.vocabularyForm.get('expression')?.value;
    const sentence = this.vocabularyForm.get('contextSentence')?.value;
    if (!expression || !sentence) return;

    this.isChecking = true;

    this.http.post<{ isCorrect: boolean; feedback: string; correctedSentence: string }>(
      `${this.apiUrl}/gemini/check`,
      { expression, sentence }
    ).subscribe({
      next: (result) => {
        this.checkResult = result;
        this.isChecking = false;
      },
      error: () => {
        this.toastr.error('Could not check sentence', 'Error');
        this.isChecking = false;
      }
    });
  }

  onSubmit() {
    this.vocabularyForm.markAllAsTouched();
    if (this.vocabularyForm.invalid) return;

    const vocabData = this.vocabularyForm.getRawValue();

    this.vocabService.create(vocabData).subscribe({
      next: () => {
        this.toastr.success('Expression saved!', 'Success 🎉');
        this.vocabularyForm.reset();
        this.checkResult = null;
      },
      error: () => {
        this.toastr.error('Could not save expression', 'Error');
      }
    });
  }
}