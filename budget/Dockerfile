FROM node:latest

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install

EXPOSE 3002


CMD [ "npm", "run", "dev" ]