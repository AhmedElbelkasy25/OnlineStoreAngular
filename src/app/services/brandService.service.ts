import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBrand } from '../models/ibrand';
import { IEditBrandResponse } from '../interfaces/brand/IEditBrandResponse';
import { IDeleteBrandResponse } from '../interfaces/brand/IDeleteBrandResponse';
import { IBrandArrResponse } from '../interfaces/brand/IBrandArrResponse';
import { IBrandResponse } from '../interfaces/brand/IBrandResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandServiceService {
  private apiUrl = environment.apiBaseUrl;
  private jsonHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private httpClient: HttpClient) {}

  getallBrands(): Observable<IBrandArrResponse> {
    return this.httpClient.get<IBrandArrResponse>(`${this.apiUrl}/Brands`);
  }
  getBrandById(id: number): Observable<IBrandResponse> {
    return this.httpClient.get<IBrandResponse>(`${this.apiUrl}/Brands/${id}`);
  }
  addBrand(cat: IBrand): Observable<IBrand> {
    return this.httpClient.post<IBrand>(`${this.apiUrl}/brands`, cat, {
      headers: this.jsonHeader,
    });
  }

  editBrand(cat: IBrand): Observable<IEditBrandResponse> {
    return this.httpClient.put<IEditBrandResponse>(`${this.apiUrl}/brands/${cat.id}`, cat, {
      headers: this.jsonHeader,
    });
  }

  deleteBrand(id: number): Observable<IDeleteBrandResponse> {
    return this.httpClient.delete<IDeleteBrandResponse>(`${this.apiUrl}/brands/${id}`);
  }
}
