FROM ubuntu:20.04

SHELL ["/bin/bash", "-c"]

RUN apt update \
    && apt install -y nginx systemctl

RUN apt install -y python3 python3-pip python3-setuptools build-essential libssl-dev libffi-dev libpq-dev vim
RUN apt install -y virtualenv

RUN mkdir /home/myapp

WORKDIR /home/atms

ADD ./web/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8000 8000

COPY ./entrypoint.sh /
RUN chmod 755 /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
