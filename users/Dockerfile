FROM node:latest

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001


CMD [ "npm", "run", "dev" ]
