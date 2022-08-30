FROM python:3.10.6-bullseye
ENV APP_HOME=/usr/src/ingester
COPY . $APP_HOME
WORKDIR $APP_HOME
RUN apt-get update \
  && apt-get -y install cron \
  && pip install --upgrade pip \
  && pip install -r requirements.txt \
  && crontab $APP_HOME/ingester_cron \
  && touch $APP_HOME/cron.log
ENTRYPOINT $APP_HOME/entrypoint.sh
