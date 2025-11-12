import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/icategory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getallCategory(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${environment.apiBaseUrl}/Categories`);
  }
}
