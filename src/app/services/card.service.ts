import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Card } from '../common/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardUrl = 'http://localhost:9090/api/cards';
  constructor(private _httpClient: HttpClient) {}

  getAllCards():Observable<Card[]>{
    return this._httpClient.get<GetResponse>(this.cardUrl).pipe(
      map(data => data.content)
    );
  }

  getCardListPagination(page:number,
                        pageSize:number): Observable<GetResponse> {
    const paginationUrl:string = `${this.cardUrl}?pageNo=${page}&pageSize=${pageSize}&sortBy=id`;
    return this._httpClient.get<GetResponse>(paginationUrl);
  }

  addCard(data: any ): Observable<any> {
    return this._httpClient.post("http://localhost:9090/api/cards", data);
  }

  updateCard(id:number, data: any ): Observable<any> {
    console.log(data);
    return this._httpClient.put(`http://localhost:9090/api/cards/${id}`, data);
  }


  deleteCard(id:number): Observable<any>{
    return this._httpClient.delete(`http://localhost:9090/api/cards/${id}`);
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
