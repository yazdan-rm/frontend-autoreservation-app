import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Group } from '../common/group';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseUrl = 'http://localhost:9090/api/groups';
  constructor(private httpClient: HttpClient) {}

  getFoodGroupList(): Observable<Group[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.groups));
  }
}

interface GetResponse {
  _embedded: {
    groups: Group[];
  };
}
