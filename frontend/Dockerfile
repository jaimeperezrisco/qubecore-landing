# ===================================
# QubeCore Frontend - Dockerfile (Local Dev)
# ===================================

FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Puerto de Vite
EXPOSE 5173

# CMD por defecto
CMD ["npm", "run", "dev", "--", "--host"]