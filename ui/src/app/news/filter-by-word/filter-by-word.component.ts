import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-filter-by-word',
  templateUrl: './filter-by-word.component.html',
  styleUrls: ['./filter-by-word.component.scss']
})
export class FilterByWordComponent implements OnInit, OnDestroy {
  @Output() searchTerm = new EventEmitter<string>();
  private readonly searchTerm$ = new Subject<string>();
  private readonly destroy$ = new Subject();

  ngOnInit(): void {
    this.searchTerm$
    .pipe(
      debounceTime(350),
      takeUntil(this.destroy$),
    )
    .subscribe({
      next: value => {
        this.searchTerm.emit(value);
      },
      error: err => {
        console.error('searchTerm emit failed', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  inputEdited(value: string): void {
    this.searchTerm$.next(value);
  }
}
