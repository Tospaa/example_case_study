export interface DateFilter {
  mode: DateFilterMode;
  exactDate: string;
  startDate: string;
  endDate: string;
}

export type DateFilterMode = 'single' | 'range';
