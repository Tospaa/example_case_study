import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByTickerComponent } from './filter-by-ticker.component';

describe('FilterByTickerComponent', () => {
  let component: FilterByTickerComponent;
  let fixture: ComponentFixture<FilterByTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByTickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
