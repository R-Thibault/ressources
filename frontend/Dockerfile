FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY src src
COPY public public
COPY tsconfig.json tsconfig.json 

CMD npm run dev