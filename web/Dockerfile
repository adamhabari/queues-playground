FROM node:19-bullseye

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY ./server.js ./

CMD ["npm","start"]
