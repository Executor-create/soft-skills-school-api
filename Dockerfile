FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ARG MONGO_URL
ENV MONGO_URL=$MONGO_URL

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]