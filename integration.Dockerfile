FROM node:24-bookworm

# ... (instalación de chromium igual que antes)

WORKDIR /app

# Creamos la carpeta de cache y le damos permisos 
# para que cualquier usuario pueda escribir en ella
RUN mkdir -p .angular && chmod 777 .angular

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Aseguramos que el usuario de Jenkins pueda escribir en todo el proyecto
RUN chmod -R 777 /app
# # Usamos Node 24 (Debian Bookworm)
# FROM node:24-bookworm

# # Instalamos Chromium de los repositorios oficiales de Bookworm
# # No necesitamos cambiar el sources.list
# RUN apt-get update && apt-get install -y \
#     chromium \
#     --no-install-recommends && \
#     rm -rf /var/lib/apt/lists/*

# WORKDIR /app

# # Definimos la variable para que Karma/Protractor/Cypress lo encuentren
# ENV CHROME_BIN=/usr/bin/chromium

# # Copiamos solo los archivos de dependencias primero (mejor uso de caché)
# COPY package*.json ./

# # Instalamos con la velocidad de Node 24
# RUN npm install --legacy-peer-deps

# # Copiamos el resto del código
# COPY . .

# Si quieres ejecutar tests en el build, descomenta la siguiente línea
# RUN npm run test -- --browsers=ChromeHeadless --watch=false

# FROM node:24
# #FROM node:14
# RUN echo "deb http://archive.debian.org/debian stretch main contrib non-free" > /etc/apt/sources.list && \
#     echo "deb http://archive.debian.org/debian-security stretch/updates main contrib non-free" >> /etc/apt/sources.list && \
#     apt-get update && \
#     apt-get install -y \
#     chromium \
#     --no-install-recommends && rm -rf /var/lib/apt/lists/*

# WORKDIR /app

# COPY package.json . 

# RUN npm --version

# RUN rm -rf node_modules/* 
# #RUN npm install
# RUN npm install --legacy-peer-deps

# ENV CHROME_BIN=/usr/bin/chromium

# COPY . .            
# # RUN npm run test-coverage