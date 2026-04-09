
import { Component, NgZone, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Collection } from './collection';
import { VocabularyService } from '../../services/vocabulary.service';
import { Router } from '@angular/router';

// Mock du composant lucide-icon pour éviter l'erreur liée à l'icône
@Component({selector: 'lucide-icon', template: '', standalone: true})
class MockLucideIconComponent {}

describe('Collection', () => {
  let component: Collection;
  let fixture: ComponentFixture<Collection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Collection, MockLucideIconComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .overrideComponent(Collection, {
      set: {
        imports: [MockLucideIconComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Collection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Your collection');
  });

  it('should load stats on init', () => {
   
 const mockStats = { total: 10, new: 2, learning: 5, mastered: 3 };
  const vocabService = TestBed.inject(VocabularyService);
vi.spyOn(vocabService, 'getStats').mockReturnValue(of(mockStats));
  component.ngOnInit();
  fixture.detectChanges();

  expect(component.stats).toEqual(mockStats);
});



it('should display loading message if stats is null', () => {
  component.stats = null;
  fixture.detectChanges();
  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.textContent).toContain('Chargement...');
});


it('should navigate on onFlashcards onClick on button', () => {
  const router = TestBed.inject(Router);
  const navigateSpy = vi.spyOn(router, 'navigateByUrl');
  const button = fixture.nativeElement.querySelector('button');
  button.click();
  expect(navigateSpy).toHaveBeenCalledWith('flashcards');
});
});
