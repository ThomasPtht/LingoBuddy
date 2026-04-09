import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyEntryForm } from './vocabulary-entry-form';

describe('VocabularyEntryForm', () => {
  let component: VocabularyEntryForm;
  let fixture: ComponentFixture<VocabularyEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabularyEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
