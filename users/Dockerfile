FROM node:alpine

RUN yarn global add nodemon

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3001

CMD [ "yarn", "run", "dev" ]
