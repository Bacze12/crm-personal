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
