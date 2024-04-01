import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../common/food';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private baseUrl = 'http://localhost:9090/api/foods';
  constructor(private httpClient: HttpClient) {}

  getFoodList(): Observable<Food[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.foods));
  }
}

interface GetResponse {
  _embedded: {
    foods: Food[];
  };
}
