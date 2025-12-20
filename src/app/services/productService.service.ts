import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductArr } from '../interfaces/products/IProductArr';

import { IProductCreate } from '../interfaces/products/IProductCreate';
import { IProduct } from '../models/iproduct';
import { IStringGeneralResponse } from '../interfaces/general/IStringGeneralResponse';
import { IProductResponse } from '../interfaces/products/IProductResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  private apiUrl = environment.apiBaseUrl;
  private jsonHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<IProductArr> {
    return this.httpClient.get<IProductArr>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<IProductResponse> {
    return this.httpClient.get<IProductResponse>(`${this.apiUrl}/Products/${id}`);
  }

  addProduct(product: FormData): Observable<IProductCreate> {
    debugger;
    return this.httpClient.post<IProductCreate>(`${this.apiUrl}/Products`, product);
  }

  editProduct(product: IProduct): Observable<IProductCreate> {
    return this.httpClient.put<IProductCreate>(`${this.apiUrl}/Products`, product, {
      headers: this.jsonHeader,
    });
  }

  deleteProduct(id: number): Observable<IStringGeneralResponse> {
    return this.httpClient.delete<IStringGeneralResponse>(`${this.apiUrl}/products/${id}`);
  }
}
