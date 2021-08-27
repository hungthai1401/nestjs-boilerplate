FROM node:16.7-slim AS builder

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY . .

RUN rm -rf dist

RUN yarn build

FROM node:16.7-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]
