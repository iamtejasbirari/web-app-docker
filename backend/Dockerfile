FROM node:18-alpine

WORKDIR /web-app/backend

COPY package*.json .

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]