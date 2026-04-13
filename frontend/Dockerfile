# ===================================
# QubeCore Frontend - Dockerfile
# ===================================

# -- Stage 1: Build Frontend (Vite) --
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Construir para producción (se generarán los estáticos en /app/dist)
# Nota: Como el front y el back estarán en el mismo dominio bajo Nginx,
# el front hará las peticiones a /api automáticamente si VITE_API_URL no se especifica.
RUN VITE_API_URL="" npm run build

# -- Stage 2: Serve Nginx --
FROM nginx:alpine

# Copiamos la build de Vite a la carpeta pública de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer puerto 80 (aunque el docker-compose mapeará puertos/volúmenes y reescribirá la conf)
EXPOSE 80
