FROM node:alpine

WORKDIR /api

COPY package.json .

COPY ./prisma ./prisma

RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY ./.env.production ./.env

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm","run","start:prod" ]