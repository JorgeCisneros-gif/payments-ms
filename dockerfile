FROM node:20-alpine

WORKDIR /usr/src/app

# Copiamos primero package.json y package-lock.json
COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3003
