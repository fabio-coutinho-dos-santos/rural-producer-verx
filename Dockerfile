FROM node:18

WORKDIR /app

COPY . /app

RUN npm install && npm run build

CMD ["node", "dist/main.js"]