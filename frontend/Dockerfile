FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY src src
COPY public public
COPY .eslintrc.json .eslintrc.json
COPY next-env.d.ts next-env.d.ts 
COPY next.config.js next.config.js
COPY tsconfig.json tsconfig.json

CMD npm run dev