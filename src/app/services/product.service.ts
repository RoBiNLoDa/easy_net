import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Config } from '../utils/config';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = Config.apiURL;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<IProduct>{
    return this.http.get<IProduct>(this.apiUrl+id)
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete(this.apiUrl+id)
  }

  editProduct(id: string | undefined, product: IProduct): Observable<IProduct>{
    return this.http.patch<IProduct>(this.apiUrl+id, product)
  }

  createProduct(product: IProduct): Observable<any>{
    return this.http.post(this.apiUrl, product)
  }
}
