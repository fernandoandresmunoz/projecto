FROM node:16.20.2
#FROM node:14
RUN echo "deb http://archive.debian.org/debian stretch main contrib non-free" > /etc/apt/sources.list && \
    echo "deb http://archive.debian.org/debian-security stretch/updates main contrib non-free" >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y \
    chromium \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json . 

RUN npm --version

RUN rm -rf node_modules/* 
#RUN npm install
RUN npm install --legacy-peer-deps

ENV CHROME_BIN=/usr/bin/chromium

COPY . .            
# RUN npm run test-coverage