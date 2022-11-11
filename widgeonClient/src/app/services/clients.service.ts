import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  runQuery(myQuery: any) {
    const res = this.http.get('http://localhost:3000/api/query', {
      headers: new HttpHeaders({ query: myQuery }),
    });
    return res;
  }
}
