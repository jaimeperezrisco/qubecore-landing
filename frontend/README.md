# QubeCore - Frontend

Este documento describe cómo instalar, ejecutar, construir y contribuir al componente frontend del proyecto QubeCore. Está diseñado para nuevos colaboradores y para prácticas de DevOps.

Tabla de contenidos:
- Visión general
- Tech stack
- Requisitos previos
- Desarrollo local
- Entorno y variables de entorno
- Scripts (package.json)
- Ejecución con Docker (local)
- Endpoints usados por el frontend
- Estructura del proyecto
- Estilo y accesibilidad
- Flujo de autenticación
- Resolución de problemas
- Contribución y guía de estilo
- Licencia

## Visión general
El frontend se comunica con la API REST del backend provisto por los servicios Spring Boot. La interfaz utiliza Vite como servidor de desarrollo, React, Tailwind CSS y Framer Motion para las animaciones. Los endpoints de la API incluyen, entre otros, GET /api/servicios, POST /api/solicitudes y endpoints de autenticación bajo /api/auth.

## Tech stack
- React + Vite
- Tailwind CSS (opcional)
- Framer Motion (animaciones)
- Fetch (o Axios) para solicitudes HTTP
- Entorno: Vite

## Requisitos previos
- Node.js 18.x o superior
- npm (o Yarn)
- Git

## Desarrollo local
1) Clonar el repositorio e instalar dependencias
   - git clone <URL_DEL_REPOSITORIO>
   - cd qubecore-landing
   - cd frontend
   - npm install   o   yarn install

2) Configurar entorno (opcional)
   - El frontend lee VITE_API_URL desde variables de entorno.
   - Ejemplo (Linux/macOS):
     export VITE_API_URL=http://localhost:8080
   - Si usas Docker, backend puede ejecutarse en localhost:8080 o en una URL reachable.

3) Iniciar el servidor de desarrollo
   - npm run dev   (o yarn dev)
   - Abrir http://localhost:5173 (o el puerto indicado en la consola).

4) Construir para producción
   - npm run build   (o yarn build)
   - Los archivos se generan en la carpeta dist/ de forma predeterminada.

5) Previsualizar una build de producción
   - npm run preview   (o yarn preview)

6) Lint y formato (recomendado)
   - npm run lint
   - npm run format

## Entorno y variables de entorno
- VITE_API_URL: URL base de la API del backend (p. ej. http://localhost:8080)
- Otras variables pueden añadirse con el prefijo VITE_ en el futuro.
- No indexar secretos en el repositorio. Usa variables de entorno en tiempo de ejecución.

## Scripts (package.json)
- dev: Iniciar el servidor de desarrollo (Vite)
- build: Construir para producción
- preview: Servir la build localmente para validación
- lint: Ejecutar linter
- format: Formatear código
- test: Ejecutar pruebas (si existen)

Ejemplo con npm:
```
npm run dev
```
```
npm run build
```
```
npm run preview
```

## Ejecución con Docker (local)
Este proyecto incluye un docker-compose local para ejecutar el frontend junto con el backend para pruebas end-to-end.
- Iniciar todos los servicios:
  docker compose -f docker-compose.local.yml up -d
- Detener todos los servicios:
  docker compose -f docker-compose.local.yml down
- El login de administrador está disponible en /admin una vez seedado (admin@qubecore.es) con la contraseña Admin123!.

Si solo quieres iniciar el frontend, asegúrate de que la URL del backend esté disponible mediante VITE_API_URL.

## Endpoints usados por el frontend
- GET /api/servicios: listar servicios
- POST /api/solicitudes: crear una solicitud de servicio
- POST /api/auth/login: autenticación (devuelve JWT)

Ejemplo de solicitud desde el frontend (conceptual):
```
fetch(`${import.meta.env.VITE_API_URL}/api/solicitudes`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre, email, empresa, mensaje, serviceId })
})
```

## Estructura del proyecto (alto nivel)
- src/          Código fuente del frontend
- src/components/  Componentes reutilizables (Contact, AdminPanel, etc.)
- src/pages/       Páginas basadas en rutas (si aplica)
- assets/        Recursos estáticos
- vite.config.js  Configuración de Vite
- index.html     Entrada de la app
- tailwind.config.js (si se usa Tailwind)

## Estilo y accesibilidad
- Usar HTML semántico y roles ARIA donde aplique
- Garantizar contraste de color acorde a WCAG AA para elementos críticos
- Mantener focus outlines visibles y navegación con teclado

## Flujo de autenticación (JWT)
- Inicio de sesión de admin genera un JWT, que se almacena en memoria/localStorage (según tu política)
- El frontend añade el token a las peticiones protegidas mediante un interceptor de requests
- Las rutas de admin requieren un usuario con rol ADMIN

## Resolución de problemas
- Un 403 en /admin: asegúrate de estar logueado como ADMIN y de enviar el token en el header Authorization
- Si el frontend no llega al backend, verifica la configuración de VITE_API_URL y CORS en el backend
- Verifica que docker-compose.local.yml esté healthy (MySQL y backend)

## Contribución y guía de estilo
- Nombres de rama: feature/xyz, fix/bug-xyz
- Commits: un objetivo por commit, describir el porqué
- PRs: incluir pruebas o pasos de verificación cuando sea posible

---
## Diagrama de Arquitectura (ASCII)
A grandes rasgos, flujo Frontend -> Backend -> DB. El token JWT se emite desde /api/auth/login y se envía en las llamadas protegidas.
```
+-------------------+        +----------------------------+        +-----------------+
|   Frontend (UI)   | <----> |  Backend (Spring Boot)     | <----> |   Base de Datos  |
+-------------------+        +----------------------------+        +-----------------+
        |                          |  JWT (login)               |
        |  solicita endpoints      |  tokens en Authorization      |
        |  (GET/POST)              |  Bearer <token>               |
        v                          v                                v
   /api/servicios           /api/solicitudes             (servicios, usuarios, etc.)
```
 
## Ejemplos de respuestas JSON de endpoints
### GET /api/servicios
Ejemplo de respuesta:
```json
[
  {"id":1,"name":"Quantum Hardware Access","active":true,"sortOrder":1},
  {"id":2,"name":"Quantum Software Development","active":true,"sortOrder":2},
  {"id":3,"name":"Quantum Consulting","active":true,"sortOrder":3},
  {"id":4,"name":"Quantum Education","active":true,"sortOrder":4},
  {"id":5,"name":"Quantum Cloud Services","active":true,"sortOrder":5},
  {"id":6,"name":"Quantum Security","active":true,"sortOrder":6}
]
```
### POST /api/solicitudes
Ejemplo de request:
```json
{
  "name": "Test",
  "email": "test@example.com",
  "company": "TestCo",
  "phone": "123456789",
  "message": "Hola",
  "serviceId": 1
}
```
Respuesta de ejemplo:
```json
{
  "id": 1,
  "name": "Test",
  "email": "test@example.com",
  "company": "TestCo",
  "phone": "123456789",
  "message": "Hola",
  "service": "Quantum Hardware Access",
  "status": "PENDING",
  "createdAt": "2026-04-25T14:35:08.468744",
  "internalNotes": null
}
```
### POST /api/auth/login
Respuesta de ejemplo (token JWT):
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "Admin QubeCore",
  "email": "admin@qubecore.es",
  "role": "ROLE_ADMIN"
}
```
