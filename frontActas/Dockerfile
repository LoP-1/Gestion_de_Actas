# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copiar todo y construir en modo producción
COPY . .
RUN npm run build -- --configuration=production

# Runtime stage: Nginx
FROM nginx:alpine
# Copiar nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los artefactos (sea cual sea el nombre del proyecto dentro de dist)
# Esto copia todos los contenidos de dist/ al root de nginx
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]