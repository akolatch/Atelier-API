FROM node:latest

WORKDIR /app

COPY package.json /src/package.json

RUN npm install

COPY . /src

CMD ["node", "src/server/index.js"]