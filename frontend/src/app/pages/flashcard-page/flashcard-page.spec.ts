import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardPage } from './flashcard-page';

@Component({ selector: 'app-flashcard', template: '', standalone: true })
class MockFlashcardComponent {}

describe('FlashcardPage', () => {
  let component: FlashcardPage;
  let fixture: ComponentFixture<FlashcardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardPage],
    })
      .overrideComponent(FlashcardPage, {
        set: { imports: [MockFlashcardComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FlashcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
