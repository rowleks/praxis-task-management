FROM node:24-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "run", "dev" ]
