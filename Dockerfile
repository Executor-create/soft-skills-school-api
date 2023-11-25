FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

COPY .env .env

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]