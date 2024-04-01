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

  getCardListPagination(page:number,
                        pageSize:number): Observable<GetResponse> {
    const paginationUrl:string = `${this.cardUrl}?pageNo=${page}&pageSize=${pageSize}`;

    return this.httpClient.get<GetResponse>(paginationUrl);
  }
}

interface GetResponse {
  content:Card[],
  pageNo: number,
  pageSize: number,
  totalElements: number,
  totalPages: number,
  last: boolean
}
