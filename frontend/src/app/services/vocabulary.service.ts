import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { VocabularyItem, VocabularyStats } from '../models/vocabulary.model';

@Injectable({ providedIn: 'root' })
export class VocabularyService {
  private apiUrl = '/api/vocabulary'; 

  constructor(private http: HttpClient) {}

  getStats(): Observable<VocabularyStats> {
    return this.http.get<VocabularyStats>(`${this.apiUrl}/stats`);
  }

  create(data: Omit<VocabularyItem, 'id'>): Observable<VocabularyItem> {
    return this.http.post<VocabularyItem>(this.apiUrl, data);
  }

 getAll(): Observable<VocabularyItem[]> {
    return this.http.get<VocabularyItem[]>(this.apiUrl);
  }

 deleteById(id: number) {
  return this.http.delete(`/api/vocabulary/${id}`);
}
}