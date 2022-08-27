import FinNews as fn

yahoo = fn.Yahoo(topics=['*'])
yahoo.add_topics(['$AAPL', '$GOOG', '$AMZN'])

news_array = yahoo.get_news()

for new in news_array:
  print(new['id'])
