export interface New {
  id: string;
  title: string;
  summary?: string;
  link: string;
  published: Date;
  inserted: Date;
  img_url?: string;
  ticker?: string;
}
