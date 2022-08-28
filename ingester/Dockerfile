FROM python:3.10.6-bullseye
COPY . /usr/src/ingester
WORKDIR /usr/src/ingester
RUN pip install --upgrade pip && pip install -r requirements.txt
CMD python3
