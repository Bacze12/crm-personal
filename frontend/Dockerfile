# Usa una imagen base de Node.js, ideal para aplicaciones de desarrollo
FROM node:18-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia la carpeta compartida primero
COPY shared/ ./shared/

# Copia los archivos de metadatos del frontend (package files primero para optimizar cache)
COPY frontend/package*.json ./frontend/

# Cambia al directorio del frontend para instalar dependencias
WORKDIR /app/frontend

# Instala las dependencias del proyecto
RUN npm ci

# Vuelve al directorio raíz y copia el resto del código del frontend
WORKDIR /app
COPY frontend/ ./frontend/

# Establece el directorio de trabajo final
WORKDIR /app/frontend

# Expone el puerto que usa el servidor de desarrollo de Vite por defecto
EXPOSE 5173

# Define el comando para iniciar el servidor de desarrollo
# El --host 0.0.0.0 es importante para Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]