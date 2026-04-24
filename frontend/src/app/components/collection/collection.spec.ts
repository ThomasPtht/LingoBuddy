import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { Collection } from './collection';
import { VocabularyService } from '../../services/vocabulary.service';
import { Router } from '@angular/router';

@Component({ selector: 'lucide-icon', template: '', standalone: true })
class MockLucideIconComponent {}

const mockStats = { total: 10, new: 2, learning: 5, mastered: 3 };

describe('Collection', () => {
  let component: Collection;
  let fixture: ComponentFixture<Collection>;
  let vocabServiceMock: { getStats: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    vocabServiceMock = {
      getStats: vi.fn().mockReturnValue(of(mockStats)),
    };

    await TestBed.configureTestingModule({
      imports: [Collection, MockLucideIconComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: VocabularyService, useValue: vocabServiceMock },
        { provide: Router, useValue: { navigateByUrl: vi.fn() } },
      ],
    })
      .overrideComponent(Collection, {
        set: { imports: [MockLucideIconComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Collection);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    expect(vocabServiceMock.getStats).toHaveBeenCalled();
    expect(component.stats).toEqual(mockStats);
  });

  it('should display loading message if stats is null', () => {
    component.stats = null;
    fixture.componentRef.changeDetectorRef.markForCheck();
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
