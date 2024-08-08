import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private baseUrl = 'https://api.sampleapis.com/wines';

  constructor(private http: HttpClient) {}

  getRedWines(): Observable<any> {
    console.log('Fetching red wines from API');
    return this.http.get<any>(`${this.baseUrl}/reds`);
  }

  getWhiteWines(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/whites`);
  }

  getSparklingWines(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sparkling`);
  }

  getRoseWines(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/rose`);
  }

  getPortWines(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/port`);
  }
}
