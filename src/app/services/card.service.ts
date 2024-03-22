import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Card } from '../common/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardUrl = 'http://localhost:9090/api/cards';
  constructor(private httpClient: HttpClient) {}

  getCardList(): Observable<Card[]> {
    return this.httpClient
      .get<GetResponse>(this.cardUrl)
      .pipe(map((response) => response._embedded.cards));
  }
}

interface GetResponse {
  _embedded: {
    cards: Card[];
  };
}
