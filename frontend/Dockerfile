# Build stage
FROM node:24-bullseye-slim AS build-stage

WORKDIR /usr/src/app

ENV CI=true

COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_API_URL="/api"
ENV VITE_API_URL=$VITE_API_URL

RUN ["npm", "run", "build"]

# Production stage
FROM nginx:1.29-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80