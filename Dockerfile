FROM node:18

RUN apk update && apk upgrade

WORKDIR /app

COPY . /app

RUN npm install && npm run build

CMD ["node", "dist/main.js"]