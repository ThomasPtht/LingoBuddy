import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home-page';

@Component({ selector: 'app-collection', template: '', standalone: true })
class MockCollectionComponent {}

@Component({ selector: 'app-vocabulary-entry-form', template: '', standalone: true })
class MockVocabularyEntryFormComponent {}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
    })
      .overrideComponent(HomePage, {
        set: { imports: [MockCollectionComponent, MockVocabularyEntryFormComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
