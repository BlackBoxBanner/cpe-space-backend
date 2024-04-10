FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

COPY ./dist .

EXPOSE 5100

CMD ["node", "src/server.js"]