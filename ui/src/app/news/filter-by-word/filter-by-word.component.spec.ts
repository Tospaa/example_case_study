import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByWordComponent } from './filter-by-word.component';

describe('FilterByWordComponent', () => {
  let component: FilterByWordComponent;
  let fixture: ComponentFixture<FilterByWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
