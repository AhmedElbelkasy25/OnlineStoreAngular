import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductCreate } from '../interfaces/products/IProductCreate';
import { IStringGeneralResponse } from '../interfaces/general/IStringGeneralResponse';
import { IProductResponse } from '../interfaces/products/IProductResponse';
import { IGetProductResponse } from '../interfaces/products/IGetProductResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  private apiUrl = environment.apiBaseUrl;
  private jsonHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  getAllProducts(page: number, items: number): Observable<IGetProductResponse> {
    return this.httpClient.get<IGetProductResponse>(
      `${this.apiUrl}/products?page=${page}&items=${items}`
    );
  }

  getProductById(id: number): Observable<IProductResponse> {
    return this.httpClient.get<IProductResponse>(`${this.apiUrl}/Products/${id}`);
  }

  addProduct(product: FormData): Observable<IProductCreate> {
    debugger;
    return this.httpClient.post<IProductCreate>(`${this.apiUrl}/Products`, product);
  }

  editProduct(product: FormData): Observable<IProductCreate> {
    return this.httpClient.put<IProductCreate>(`${this.apiUrl}/Products`, product);
  }

  deleteProduct(id: number): Observable<IStringGeneralResponse> {
    return this.httpClient.delete<IStringGeneralResponse>(`${this.apiUrl}/products/${id}`);
  }
}
