# Create the image based on the official Node 8.9.0 image from Dockerhub
FROM node:8.9.0 as node
RUN mkdir -p /to-do-app
WORKDIR /to-do-app

COPY package.json /to-do-app

RUN npm install

COPY . /to-do-app

EXPOSE 5678

RUN npm run build

FROM nginx:1.13.7-alpine

COPY --from=node /to-do-app/dist/ /usr/share/nginx/html

COPY ./nginx-to-do-app.conf /etc/nginx/conf.d/default.conf
