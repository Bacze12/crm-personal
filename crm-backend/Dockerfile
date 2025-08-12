# Usa una imagen base de Node.js, recomendada para despliegues.
FROM node:18-alpine

# Define el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copia la carpeta compartida primero
COPY shared/ ./shared/

# Ahora copia los archivos del backend (package files primero para optimizar cache)
COPY crm-backend/package*.json ./crm-backend/

# Cambia al directorio del backend para instalar dependencias
WORKDIR /app/crm-backend

# Instala las dependencias del proyecto.
RUN npm ci

# Vuelve al directorio raíz y copia el resto del código del backend
WORKDIR /app
COPY crm-backend/ ./crm-backend/

# Establece el directorio de trabajo final
WORKDIR /app/crm-backend

# Genera el cliente de Prisma
RUN npx prisma generate

# Expone el puerto que tu aplicación usa para escuchar las peticiones.
EXPOSE 3000

# Define el comando para iniciar la aplicación.
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]