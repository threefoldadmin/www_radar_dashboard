import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public get(path: string, query: any = null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${environment.API_URL}${environment.API_VERSION}/${path}`, { headers, params: query });
  }

}
