import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DateFilter } from 'src/app/models/date-filter.model';
import { New } from 'src/app/models/new.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  public news: New[] = [];

  constructor(private newsService: NewsService) { }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.newsService.getNews()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: this.assignNews.bind(this),
      error: this.handleApiError.bind(this),
    });
  }

  newsTrackBy(_index: number, item: New): string {
    return item.id;
  }

  search(word: string): void {
    if (!word) {
      this.getNews();
      return;
    }

    this.newsService.performFullTextSearch(word)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: this.assignNews.bind(this),
      error: this.handleApiError.bind(this),
    });
  }

  tickerSelected(ticker: string): void {
    this.newsService.getNewsByTicker(ticker)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: this.assignNews.bind(this),
      error: this.handleApiError.bind(this),
    });
  }

  filterByDate(dateFilter : DateFilter): void {
    this.newsService.getNewsByDateFilter(dateFilter)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: this.assignNews.bind(this),
      error: this.handleApiError.bind(this),
    });
  }

  private assignNews(data: New[]): void {
    this.news = data;
    console.log(this.news);
  }

  private handleApiError(err: Error): void {
    this.news = [];
    console.error('Error while interacting with API', err);
  }
}
