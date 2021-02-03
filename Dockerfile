FROM node:latest

ENV NODE_ENV=production 

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "app/server/index.js"]