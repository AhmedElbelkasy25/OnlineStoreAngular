import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/icategory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ICategoryArrResponse } from '../interfaces/category/ICategoryArrResponse';
import { ICatgeoryResponse } from '../interfaces/category/ICatgeoryResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getallCategory(): Observable<ICategoryArrResponse> {
    return this.httpClient.get<ICategoryArrResponse>(`${environment.apiBaseUrl}/Categories`);
  }
  getCategoryById(id: number): Observable<ICatgeoryResponse> {
    return this.httpClient.get<ICatgeoryResponse>(`${environment.apiBaseUrl}/Categories/${id}`);
  }
}
