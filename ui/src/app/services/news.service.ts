import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateFilter } from '../models/date-filter.model';
import { New } from '../models/new.model';
import { OnlyTicker } from '../models/only-ticker.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  newsApi = `${environment.apiRoot}/news`;

  constructor(private http: HttpClient) { }

  getNews(): Observable<New[]> {
    return this.http.get(this.newsApi)
    .pipe(
      map(data => data as New[])
    );
  }

  performFullTextSearch(word: string): Observable<New[]> {
    return this.http.get(`${this.newsApi}/search`, {
      params: {
        q: word,
      }
    })
    .pipe(
      map(data => data as New[])
    );
  }

  getTickers(): Observable<OnlyTicker[]> {
    return this.http.get(`${this.newsApi}/ticker`)
    .pipe(
      map(data => data as OnlyTicker[])
    );
  }

  getNewsByTicker(ticker: string): Observable<New[]> {
    return this.http.get(`${this.newsApi}/ticker/${ticker}`)
    .pipe(
      map(data => data as New[])
    );
  }

  getNewsByDateFilter(dateFilter: DateFilter): Observable<New[]> {
    const params = {} as any;
    if (dateFilter.mode == 'single') {
      params.exactDate = dateFilter.exactDate;
    } else if (dateFilter.mode == 'range') {
      params.startDate = dateFilter.startDate;
      params.endDate = dateFilter.endDate;
    }

    return this.http.get(`${this.newsApi}/date`, {
      params
    })
    .pipe(
      map(data => data as New[])
    );
  }
}
