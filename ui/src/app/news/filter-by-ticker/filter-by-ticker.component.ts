import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Subject, takeUntil } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-filter-by-ticker',
  templateUrl: './filter-by-ticker.component.html',
  styleUrls: ['./filter-by-ticker.component.scss']
})
export class FilterByTickerComponent implements OnInit, OnDestroy {
  loading = true;
  items: SelectItem[] = [];
  destroy$ = new Subject();
  @Output() selected = new EventEmitter<string>();

  constructor(private newsService: NewsService) { }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.newsService.getTickers();
  }

  onShow(): void {
    if (this.items.length > 0) {
      return;
    }

    this.newsService.getTickers()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: data => {
        for (const elem of data) {
          this.items.push({
            value: elem.ticker,
            label: elem.ticker,
          });
        }
        this.loading = false;
      },
      error: err => {
        console.error('error while getting tickers', err);
      }
    });
  }

  emitSelected(selectedTicker: string): void {
    this.selected.emit(selectedTicker);
  }
}
