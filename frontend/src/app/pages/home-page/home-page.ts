import { Component } from '@angular/core';
import { VocabularyEntryForm } from '../../components/vocabulary-entry-form/vocabulary-entry-form';
import { Collection } from '../../components/collection/collection';

@Component({
  selector: 'app-home-page',
  imports: [VocabularyEntryForm, Collection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
