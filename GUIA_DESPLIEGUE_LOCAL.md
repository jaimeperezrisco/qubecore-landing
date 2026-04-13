# 🚀 Guía de Despliegue Local — QubeCore

Guía oficial para levantar el stack completo de **QubeCore** en tu máquina local, ideal para demostraciones escolares y pruebas sin depender de internet ni VPS.

> **Arquitectura en Local:**
> Frontend React (Vite) → `http://localhost:5173`
> Backend Spring Boot → `http://localhost:8080`
> MySQL 8 → puerto `3307` (evita conflictos con MySQL local si lo tuvieras)

---

## 📦 Estructura del Proyecto

```
qubecore-landing/
├── frontend/                  → Aplicación React (Vite)
│   └── src/
│       ├── components/        → Todos los componentes de la landing
│       └── config/            → Configuración (emailjs archivado)
├── qubecore-backend/          → API REST Spring Boot 3.2
│   └── src/main/java/com/qubecore/
│       ├── controller/        → Endpoints REST
│       ├── service/           → Lógica de negocio
│       ├── model/             → Entidades JPA
│       ├── security/          → JWT + Spring Security
│       └── config/            → CORS, SecurityConfig
├── docker-compose.local.yml   → ← ESTE es el que usas en local
├── docker-compose.yml         → Solo para producción VPS (no tocar en local)
├── .env.example               → Plantilla de referencia para VPS (no necesaria en local)
├── GUIA_DESPLIEGUE_LOCAL.md   → Este archivo
└── GUIA_DESPLIEGUE_VPS.md     → Guía para producción
```

---

## 🛠️ 1. Prerrequisitos

Asegúrate de tener instalado en el equipo:

| Herramienta | Versión mínima | ¿Para qué? |
|-------------|---------------|------------|
| **Docker** + Docker Compose | Cualquier versión reciente | Base de datos + Backend Java |
| **Node.js** + npm | Node 18 o 20 | Frontend React |

> ℹ️ No necesitas instalar Java, Maven ni MySQL — Docker los proporciona automáticamente.

---

## 🗂️ 2. Variables de Entorno

**No necesitas ningún archivo `.env` para el entorno local.**

El archivo `docker-compose.local.yml` ya incluye todas las variables necesarias incrustadas:
- Credenciales de MySQL
- Clave JWT
- Configuración de puertos

El frontend detecta automáticamente `http://localhost:8080` como URL del backend si no hay variable `VITE_API_URL` definida.

> El archivo `.env.example` es solo una plantilla de referencia para cuando quieras desplegar en VPS en el futuro. No lo modifiques ni lo necesitas en local.

---

## ▶️ 3. Arrancar el Backend y la Base de Datos

Abre una terminal en la carpeta raíz del proyecto:

```bash
cd qubecore-landing
docker compose -f docker-compose.local.yml up --build -d
```

**¿Qué ocurre internamente?**
1. Docker descarga y levanta MySQL 8.0 en el puerto `3307`
2. Espera a que MySQL esté sano (healthcheck con hasta 10 reintentos)
3. Levanta el backend Spring Boot en el puerto `8080`
4. Al arrancar, Java ejecuta el `CommandLineRunner` que:
   - Crea el usuario `admin@qubecore.es` si no existe
   - Inserta los 6 servicios base si la tabla está vacía

**Verificar que todo está en verde:**
```bash
docker compose -f docker-compose.local.yml ps
```
Deberías ver `qubecore-mysql-local` y `qubecore-backend-local` con estado `running`.

**Ver logs del backend en tiempo real:**
```bash
docker compose -f docker-compose.local.yml logs -f backend
```
Espera el mensaje: `Started QubeCoreBackendApplication in X.XXX seconds`

---

## 🖥️ 4. Arrancar el Frontend React

Abre una **segunda terminal** y ejecuta:

```bash
cd qubecore-landing/frontend
npm install        # Solo la primera vez o al clonar el repo
npm run dev
```

El servidor Vite quedará escuchando en: **`http://localhost:5173`**

---

## 🎯 5. Flujo de la Demo (Paso a Paso)

### Landing Page
1. Abre el navegador en `http://localhost:5173`
2. Navega por las secciones: Hero → Soluciones → Hardware → Equipo → Contacto
3. En la sección **Contact**, rellena el formulario:
   - Nombre, empresa, email
   - Selecciona un servicio del desplegable
   - Escribe un mensaje
4. Pulsa **Send Message** — verás la confirmación en verde

### Panel de Administración
1. Ve a `http://localhost:5173/admin`
2. Inicia sesión con:
   - **Email:** `admin@qubecore.es`
   - **Contraseña:** `Admin123!`
3. En el dashboard verás:
   - **Estadísticas** de solicitudes por estado
   - **Tabla** con todas las solicitudes recibidas
   - **Botones de acción** en cada fila (visibles directamente):
     - ✅ Aceptar   🕐 En revisión   ❌ Rechazar   🗑️ Eliminar
4. Cambia el estado de la solicitud que enviaste en el paso anterior
5. Filtra por estado usando los botones de la barra de filtros

---

## 🔄 6. Reiniciar / Reconstruir

Si modificas código del **backend** (Java), debes reconstruir:
```bash
docker compose -f docker-compose.local.yml up --build -d
```

Si modificas el **frontend** (React), Vite recarga automáticamente — no hace falta nada.

---

## 🛑 7. Apagar Todo

```bash
# Apagar los contenedores (los datos persisten en el volumen)
docker compose -f docker-compose.local.yml down

# Apagar Y borrar todos los datos de la base de datos (reset completo)
docker compose -f docker-compose.local.yml down -v
```

Para parar el frontend: `Ctrl + C` en la terminal donde corre `npm run dev`.

---

## 🐞 8. Solución de Problemas Comunes

| Problema | Causa probable | Solución |
|----------|---------------|----------|
| `qubecore-mysql-local unhealthy` | MySQL tardó demasiado en arrancar | Espera 30 seg y vuelve a ejecutar `docker compose up -d` |
| `Invalid credentials` en /admin | El backend aún no terminó de arrancar | Espera que aparezca "Started QubeCoreBackendApplication" en los logs |
| Puerto 8080 ocupado | Otro servicio usa ese puerto | Para el otro servicio o cambia `8080:8080` a `8081:8080` en docker-compose.local.yml |
| Puerto 5173 ocupado | Otra instancia de Vite corriendo | Ejecuta `pkill -f vite` y vuelve a lanzar `npm run dev` |
| `WeakKeyException` en logs | JWT_SECRET demasiado corta | Ya corregido — usa `getBytes()` en `JwtTokenProvider.java` |

---

## 🔑 Credenciales de Referencia

| Servicio | Usuario | Contraseña |
|---------|---------|------------|
| Admin Panel | `admin@qubecore.es` | `Admin123!` |
| MySQL (root) | `root` | `qubecoreroot` |
| MySQL (app) | `qubecore_user` | `qubecorepass` |
