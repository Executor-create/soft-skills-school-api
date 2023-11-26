FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV MONGO_URL=$MONGO_URL

EXPOSE 80

RUN yarn build

CMD ["yarn", "start"]