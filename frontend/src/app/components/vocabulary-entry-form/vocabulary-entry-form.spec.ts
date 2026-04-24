import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyEntryForm } from './vocabulary-entry-form';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

describe('VocabularyEntryForm', () => {
  let component: VocabularyEntryForm;
  let fixture: ComponentFixture<VocabularyEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyEntryForm],
      providers: [
        provideAnimations(),
        provideToastr(),
        provideHttpClient(),
      ],
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
