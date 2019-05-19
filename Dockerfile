FROM node:alpine

RUN npm install -g @angular/cli

WORKDIR /aplicacao

CMD ng serve --host 0.0.0.0