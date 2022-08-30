import { Component, EventEmitter, Output } from '@angular/core';
import { DateFilter, DateFilterMode } from 'src/app/models/date-filter.model';

type DateOrNull = Date | null;

@Component({
  selector: 'app-filter-by-date',
  templateUrl: './filter-by-date.component.html',
  styleUrls: ['./filter-by-date.component.scss']
})
export class FilterByDateComponent {
  @Output() dateFilter = new EventEmitter<DateFilter>();
  dateMode: DateFilterMode = 'single';

  calendarSelection: DateOrNull | Array<DateOrNull> = null;

  applyFilter() {
    console.log('date mode: ', this.dateMode, 'calendar selection: ', this.calendarSelection);

    const localDateFilter: DateFilter = {
      mode: this.dateMode,
      startDate: '',
      endDate: '',
      exactDate: '',
    };

    if (this.dateMode === 'range' && Array.isArray(this.calendarSelection)) {
      localDateFilter.startDate = this.calendarSelection[0]!.toISOString();
      localDateFilter.endDate = this.calendarSelection[1]!.toISOString();
    } else if (this.dateMode === 'single' && !Array.isArray(this.calendarSelection)) {
      localDateFilter.exactDate = this.calendarSelection!.toISOString();
    }

    this.dateFilter.emit(localDateFilter);
  }

  calendarSelectionValid(): boolean {
    if (Array.isArray(this.calendarSelection)) {
      return this.calendarSelection[0] !== null && this.calendarSelection[1] !== null;
    }

    return this.calendarSelection !== null;
  }
}
