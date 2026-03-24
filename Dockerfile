FROM nginx:latest
COPY ./dist/projecto/browser/ /usr/share/nginx/html/
