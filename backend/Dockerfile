FROM node:24-bullseye-slim

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

USER node

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "start" ]
