import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonResponse, } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = `https://dummyjson.com/products`;

  constructor(private http: HttpClient) { }

  getProducts(page: number = 1, itemsPerPage: number = 10) {
    return this.http.get<JsonResponse>(
      this.url,
      {
        params: {
          limit: itemsPerPage,
          skip: itemsPerPage * (page - 1),
        }
      }
    )
  }
}
