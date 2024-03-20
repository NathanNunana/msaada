FROM node:latest

RUN npm install -g nodemon

WORKDIR /app

# COPY package.json .

COPY . .

RUN npm install

EXPOSE 3001


CMD [ "npm", "run", "dev" ]