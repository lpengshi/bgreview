FROM node:latest

# building 
ENV APP_PORT=8080 APP_DIR=/app

WORKDIR ${APP_DIR}

ADD config.json .
ADD main.js .
ADD package.json .
ADD package-lock.json .

ADD dist dist

RUN npm install

# run/execute
EXPOSE ${APP_PORT}

CMD [ "node", "main.js" ]