FROM node:19-bullseye

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY ./server.js ./
COPY ./queueService.js ./

CMD ["npm","start"]
