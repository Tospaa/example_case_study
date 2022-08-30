import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';

import { NewsRoutingModule } from './news-routing.module';
import { MainComponent } from '../news/main/main.component';
import { FilterByTickerComponent } from './filter-by-ticker/filter-by-ticker.component';
import { FilterByDateComponent } from './filter-by-date/filter-by-date.component';
import { FilterByWordComponent } from './filter-by-word/filter-by-word.component';


@NgModule({
  declarations: [
    MainComponent,
    FilterByTickerComponent,
    FilterByDateComponent,
    FilterByWordComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    TabViewModule,
    DropdownModule,
    SkeletonModule,
    CalendarModule,
    RadioButtonModule,
  ]
})
export class NewsModule { }
