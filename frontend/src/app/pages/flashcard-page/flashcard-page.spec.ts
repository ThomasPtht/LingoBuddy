import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardPage } from './flashcard-page';

describe('FlashcardPage', () => {
  let component: FlashcardPage;
  let fixture: ComponentFixture<FlashcardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
