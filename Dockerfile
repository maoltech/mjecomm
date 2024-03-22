FROM node:20.11.1-alpine

RUN npm install pm2 -g

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["pm2-runtime", "dist/index.js"]
