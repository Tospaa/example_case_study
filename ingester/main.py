import FinNews as fn
import psycopg2
import datetime
import pytz
import gc
from os import environ

class Ingester:
  DATABASE_INSERT_TEMPLATE = """
    INSERT INTO news (
      id, title, summary, link, published, inserted, img_url, ticker
    ) VALUES (
      %s::varchar(512),
      %s::varchar(512),
      %s::varchar(2048),
      %s::varchar(512),
      %s,
      now (),
      %s::varchar(512),
      %s
    )
  """
  DATABASE_FETCH_IDS = 'SELECT id FROM news'
  DOLLAR_SIGN = '$'
  ID = 'id'
  TITLE = 'title'
  SUMMARY = 'summary'
  LINK = 'link'
  PUBLISHED_PARSED = 'published_parsed'
  MEDIA_CONTENT = 'media_content'
  URL = 'url'
  TOPIC = 'topic'
  SHOULD_LOG = 'VERBOSE' in environ and environ['VERBOSE'] == 'TRUE'
  LOG_PREFIX_TEMPLATE = '[%Y-%m-%d %H:%M:%S] '

  def __init__(self, source, additional_sources=[]):
    self.news_source = fn.Yahoo(topics=source)
    self.news_source.add_topics(additional_sources)
    self.conn = None
    self.cur = None

  def log(self, *args):
    if self.SHOULD_LOG:
      print(datetime.datetime.now().strftime(self.LOG_PREFIX_TEMPLATE), *args)

  def connect_to_database(self):
    self.conn = psycopg2.connect(
      dbname=environ['POSTGRES_DB'],
      user=environ['POSTGRES_USER'],
      password=environ['POSTGRES_PASSWORD'],
      host='db')
    self.cur = self.conn.cursor()

  def save_to_database(self, data):
    self.cur.execute(self.DATABASE_INSERT_TEMPLATE, data)

  def process_story(self, new):
    new_id = new[self.ID]
    title = new[self.TITLE]
    summary = None
    link = new[self.LINK]
    p = new[self.PUBLISHED_PARSED]
    published = datetime.datetime(p.tm_year, p.tm_mon, p.tm_mday, p.tm_hour, p.tm_min, p.tm_sec, 0, pytz.UTC)
    img_url = new[self.MEDIA_CONTENT][0][self.URL]
    ticker = None
    data = (new_id, title, summary, link, published, img_url, ticker)
    self.save_to_database(data)

  def process_ticker(self, new):
    new_id = new[self.ID]
    title = new[self.TITLE]
    summary = new[self.SUMMARY]
    link = new[self.LINK]
    p = new[self.PUBLISHED_PARSED]
    published = datetime.datetime(p.tm_year, p.tm_mon, p.tm_mday, p.tm_hour, p.tm_min, p.tm_sec, 0, pytz.UTC)
    img_url = None
    ticker = new[self.TOPIC].strip(self.DOLLAR_SIGN)
    data = (new_id, title, summary, link, published, img_url, ticker)
    self.save_to_database(data)
  
  def remove_duplicate_ids(self, get_news_result):
    self.cur.execute(self.DATABASE_FETCH_IDS)
    fetch_result = self.cur.fetchall()
    read_ids = set([i[0] for i in fetch_result])
    new_list = []
    for elem in get_news_result:
        if elem[self.ID] not in read_ids:
            read_ids.add(elem[self.ID])
            new_list.append(elem)
    return new_list
  
  def get_and_store_news(self):
    self.log('Ingester started')
    get_news_result = self.news_source.get_news()
    self.log(f'Got {len(get_news_result)} news from source')
    if len(get_news_result) == 0:
      return

    self.connect_to_database()
    news_array = self.remove_duplicate_ids(get_news_result)
    del get_news_result
    gc.collect()
    self.log(f'Left {len(news_array)} news after remove_duplicate_ids')
    if len(news_array) == 0:
      return

    for new in news_array:
      if new[self.TOPIC].startswith(self.DOLLAR_SIGN):
        self.process_ticker(new)
      else:
        self.process_story(new)
    self.log('Committing changes to the database')
    self.conn.commit()

  def cleanup(self):
    self.log('Cleaning up resources')
    if self.cur is not None and not self.cur.closed:
      self.cur.close()
    if self.conn is not None and self.conn.closed == 0:
      self.conn.close()

if __name__ == '__main__':
  ingester = Ingester(['*'], ['$MSFT', '$GOOG', '$AAPL', '$AMZN', '$INTC', '$NVDA', '$META'])
  try:
    ingester.get_and_store_news()
  finally:
    ingester.cleanup()
