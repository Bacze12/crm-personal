# Frontend - NexusOps CRM

## Requisitos
- Node.js 18+
- npm 9+

## Instalación

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Configura el proxy para conectar con el backend:
   - El archivo `vite.config.ts` ya está configurado para redirigir `/auth` y `/api` a `http://localhost:3000`.
   - Si tu backend corre en otro puerto, actualiza el target en `vite.config.ts`.

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El frontend estará disponible en `http://localhost:5173`.

## Flujo de autenticación
- El login y logout funcionan automáticamente usando cookies httpOnly.
- El frontend detecta la sesión llamando a `/api/users/me`.
- No necesitas modificar nada para que el frontend se conecte al backend, solo asegúrate de que ambos estén corriendo.

## Limpieza de mocks y datos de ejemplo
- No es necesario borrar mocks manualmente, el frontend ya está conectado al backend real.
- Si agregas nuevos endpoints en el backend, asegúrate de actualizar las rutas en el frontend si es necesario.

## Estructura recomendada
- Usa el hook `useAuthContext()` para acceder al usuario y métodos de autenticación en cualquier componente.
- Para obtener datos protegidos, usa fetch con rutas `/api/...` y `credentials: 'include'`.

## Variables de entorno
- Si necesitas variables de entorno para el frontend, crea un archivo `.env` en la carpeta `frontend` (ejemplo: `VITE_API_URL`).

---

# Backend - NexusOps CRM

## Requisitos
- Node.js 18+
- npm 9+
- PostgreSQL

## Instalación

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Configura la base de datos:
   - Crea un archivo `.env` en la carpeta `crm-backend` con el siguiente contenido:
     ```env
     DATABASE_URL=postgres://usuario:password@localhost:5432/tu_basededatos
     JWT_SECRET=unsecretoseguro
     NODE_ENV=development
     ```
   - Ajusta los valores según tu entorno.

3. Ejecuta las migraciones:
   ```bash
   npx knex migrate:latest
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```
   El backend estará disponible en `http://localhost:3000`.

## Endpoints principales
- `/auth/register` - Registro de usuario
- `/auth/login` - Login (devuelve cookie httpOnly)
- `/auth/logout` - Logout (elimina cookie)
- `/api/users/me` - Devuelve el usuario autenticado

## Notas
- No subas el archivo `.env` ni `node_modules` al repositorio (ya están en `.gitignore`).
- Si cambias el puerto o rutas, actualiza el proxy en el frontend.

---

¡Listo! Así puedes trabajar y conectar el frontend y backend de NexusOps CRM.
# Frontend CRM Personal

Este frontend está construido con React, Vite y TypeScript. Utiliza TailwindCSS para estilos y varias librerías modernas para UI y manejo de formularios.

## Instalación

```bash
cd frontend
npm install
```

## Scripts
- `npm run dev`: Inicia el servidor de desarrollo en modo local.
- `npm run build`: Genera la build de producción.
- `npm run preview`: Previsualiza la build de producción.
- `npm run lint`: Linting del código.

## Estructura principal
- `src/pages/`: Vistas principales (Login, Dashboard, CRM, Projects, etc).
- `src/components/`: Componentes reutilizables y específicos de cada módulo.
- `src/hooks/`: Hooks personalizados, por ejemplo, `useAuth` para autenticación.
- `src/data/`: Funciones para consumir la API (fetch, etc).
- `src/types/`: Tipos TypeScript locales.
- `src/utils/`: Utilidades varias.

## Autenticación y Login
- El login se realiza en `src/pages/Login.tsx`.
- Utiliza el hook `useAuth` (`src/hooks/useAuth.ts`) para manejar el estado de autenticación.
- Al hacer login, se envía una petición a la API backend (`/api/login` o similar, revisa el archivo para la ruta exacta).
- Si el login es exitoso, guarda el token (probablemente en localStorage) y redirige al dashboard.
- El estado de usuario se mantiene en contexto o hook global.

## Consumo de API
- Los datos de usuarios, clientes, proyectos, etc., se obtienen mediante funciones en `src/data/`.
- Ejemplo: `fetchUsers.ts` importa el tipo `User` desde `shared/types` y hace fetch a `/api/users`.
- Todos los endpoints siguen la convención REST (`/api/users`, `/api/clients`, etc).

## Navegación
- Usa `react-router-dom` para el enrutamiento entre páginas.
- El acceso a rutas protegidas depende del estado de autenticación.

## Estilos
- TailwindCSS está configurado en `tailwind.config.js` y `postcss.config.js`.
- Los estilos globales están en `src/index.css`.

## Notas
- Los tipos compartidos con el backend están en `../../shared/types`.
- Si cambias un tipo en `shared/types`, tanto frontend como backend se actualizan.

## Recomendaciones
- Revisa los hooks y componentes para entender el flujo de datos y autenticación.
- Consulta los archivos en `src/data/` para ver cómo se consumen los endpoints.
- Si necesitas agregar endpoints, sigue la convención REST y actualiza los hooks/componentes correspondientes.

---

¿Necesitas un ejemplo de cómo se hace login o cómo se consume un endpoint específico?
