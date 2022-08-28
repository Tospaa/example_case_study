FROM python:3.10.6-bullseye
COPY . /usr/src/ingester
WORKDIR /usr/src/ingester
RUN apt-get update \
  && apt-get -y install cron \
  && pip install --upgrade pip \
  && pip install -r requirements.txt \
  && crontab /usr/src/ingester/ingester_cron \
  && touch /usr/src/ingester/cron.log
ENTRYPOINT /usr/src/ingester/entrypoint.sh
