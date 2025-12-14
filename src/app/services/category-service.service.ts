import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/icategory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ICategoryArrResponse } from '../interfaces/category/ICategoryArrResponse';
import { ICatgeoryResponse } from '../interfaces/category/ICatgeoryResponse';
import { IEditCategoryResponse } from '../interfaces/category/IEditCategoryResponse';
import { IDeleteCatgeoryResponse } from '../interfaces/category/IDeleteCatgeoryResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.apiBaseUrl;
  private jsonHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private httpClient: HttpClient) {}

  getallCategory(): Observable<ICategoryArrResponse> {
    return this.httpClient.get<ICategoryArrResponse>(`${this.apiUrl}/Categories`);
  }
  getCategoryById(id: number): Observable<ICatgeoryResponse> {
    return this.httpClient.get<ICatgeoryResponse>(`${this.apiUrl}/Categories/${id}`);
  }
  addCatgeory(cat: ICategory): Observable<ICategory> {
    return this.httpClient.post<ICategory>(`${this.apiUrl}/categories`, cat, {
      headers: this.jsonHeader,
    });
  }

  editCatgeory(cat: ICategory): Observable<IEditCategoryResponse> {
    return this.httpClient.put<IEditCategoryResponse>(`${this.apiUrl}/categories/${cat.id}`, cat, {
      headers: this.jsonHeader,
    });
  }

  deleteCategory(id: number): Observable<IDeleteCatgeoryResponse> {
    return this.httpClient.delete<IDeleteCatgeoryResponse>(`${this.apiUrl}/categories/${id}`);
  }
}
