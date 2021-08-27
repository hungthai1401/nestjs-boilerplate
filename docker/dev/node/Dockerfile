FROM node:16.7-slim

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

EXPOSE 3000

COPY . .

CMD ["yarn", "run", "start:dev"]
