FROM node:14-alpine

RUN apk update
RUN apk add g++
RUN apk add python3
RUN apk add openjdk17

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY ./ ./

CMD ["node", "src/server.js"]