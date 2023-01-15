FROM node:18.10.0-alpine

RUN yarn global add @nestjs/cli

WORKDIR /app
