
FROM nginx:1.15
COPY ./dist/chat-ap/. /usr/share/nginx/html
EXPOSE 5678
