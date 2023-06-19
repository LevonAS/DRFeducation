FROM python:3.10.11-buster

RUN apt-get update

RUN pip3 install --upgrade pip

COPY ./backend/ ./
RUN pip3 install -r requirements.txt

COPY wait-for-postgres.sh ./
RUN chmod +x wait-for-postgres.sh

RUN pip3 install gunicorn
