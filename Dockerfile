 FROM python:3
 ENV PYTHONUNBUFFERED 1
 # Setup Debian linux
 RUN export DEBIAN_FRONTEND=noninteractive
 RUN apt-get update && apt-get -y install build-essential curl
 RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
 RUN apt-get install -y nodejs
 RUN nodejs -v && npm -v

 RUN mkdir /code
 WORKDIR /code
 ADD requirements.txt /code/
 COPY package.json /code/
 ADD . /code/
 RUN pip install -r requirements.txt && npm install