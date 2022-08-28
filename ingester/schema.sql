CREATE TABLE news (
  id VARCHAR(512) UNIQUE NOT NULL,
  title VARCHAR(512) NOT NULL,
  summary VARCHAR(2048),
  link VARCHAR(512) NOT NULL,
  published TIMESTAMP WITH TIME ZONE NOT NULL,
  inserted TIMESTAMP WITH TIME ZONE NOT NULL,
  img_url VARCHAR(512),
  ticker VARCHAR(4),
  textsearchable_index_col TSVECTOR GENERATED ALWAYS AS (
      setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
      setweight(to_tsvector('english', coalesce(ticker, '')), 'C') ) STORED
);

CREATE INDEX textsearch_idx ON news USING GIN (textsearchable_index_col);
