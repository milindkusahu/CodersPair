FROM node:22.17.1-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["node", "./src/app.js"]